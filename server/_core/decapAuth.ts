import type { Express, Request, Response } from "express";
import crypto from "crypto";

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`[DecapAuth] Missing env ${name}`);
  return v;
}

function q(req: Request, key: string): string | undefined {
  const v = req.query[key];
  return typeof v === "string" ? v : undefined;
}

function normalizeOrigin(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const withProtocol = value.startsWith("http") ? value : `https://${value}`;
    return new URL(withProtocol).origin;
  } catch {
    return undefined;
  }
}

/**
 * Optional allowlist (recommended):
 * DECAP_ALLOWED_ORIGINS="https://admin.selfdezign.ro,https://www.selfdezign.ro"
 */
function parseAllowedOrigins(): Set<string> {
  const raw = process.env.DECAP_ALLOWED_ORIGINS?.trim();
  const s = new Set<string>();
  if (!raw) return s;
  for (const part of raw.split(",")) {
    const o = normalizeOrigin(part.trim());
    if (o) s.add(o);
  }
  return s;
}

function isAllowed(allowed: Set<string>, origin: string, fallbackOrigin: string): boolean {
  if (allowed.size === 0) return true; // if not set, allow (but less strict)
  return allowed.has(origin) || allowed.has(fallbackOrigin);
}

export function registerDecapAuth(app: Express) {
  const clientId = env("DECAP_GITHUB_CLIENT_ID");
  const clientSecret = env("DECAP_GITHUB_CLIENT_SECRET");

  // Origin-ul “oficial” al serverului tău (folosește admin dacă CMS e pe admin)
  const fallbackOrigin = env("DECAP_ORIGIN").replace(/\/+$/, "");
  const allowedOrigins = parseAllowedOrigins();

  const basePath = "/decap-auth";
  const redirectUri = `${fallbackOrigin}${basePath}/callback`;

  // 1) Start auth: /decap-auth/auth?provider=github&site_id=...
  app.get(`${basePath}/auth`, async (req: Request, res: Response) => {
    const provider = q(req, "provider") ?? "github";
    if (provider !== "github") return res.status(400).send("Only github provider supported");

    // IMPORTANT: Decap trimite adesea site_id (nu site_domain).
    const requestedOrigin =
      normalizeOrigin(q(req, "site_url")) ??
      normalizeOrigin(q(req, "site_domain")) ??
      normalizeOrigin(q(req, "site_id")) ??
      normalizeOrigin(req.headers.origin as string | undefined) ??
      normalizeOrigin(req.headers.referer as string | undefined);

    const originToUse = requestedOrigin && isAllowed(allowedOrigins, requestedOrigin, fallbackOrigin)
      ? requestedOrigin
      : fallbackOrigin;

    const state = crypto.randomBytes(16).toString("hex");

    res.cookie("decap_oauth_state", state, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 10 * 60 * 1000,
      path: basePath,
    });

    // Păstrăm origin-ul ferestrei CMS ca să știm unde trimitem postMessage
    res.cookie("decap_oauth_origin", originToUse, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 10 * 60 * 1000,
      path: basePath,
    });

    const authorize = new URL("https://github.com/login/oauth/authorize");
    authorize.searchParams.set("client_id", clientId);
    authorize.searchParams.set("redirect_uri", redirectUri);
    authorize.searchParams.set("scope", "repo");
    authorize.searchParams.set("state", state);

    console.log("[DecapAuth] /auth ->", {
      originToUse,
      redirectUri,
    });

    res.redirect(302, authorize.toString());
  });

  // 2) Callback: /decap-auth/callback?code=...&state=...
  app.get(`${basePath}/callback`, async (req: Request, res: Response) => {
    const code = q(req, "code");
    const state = q(req, "state");

    const expectedState = req.cookies?.decap_oauth_state;
    const callbackOrigin = req.cookies?.decap_oauth_origin || fallbackOrigin;

    if (!code || !state) return res.status(400).send("Missing code/state");
    if (!expectedState || state !== expectedState) return res.status(400).send("Invalid state");

    try {
      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "User-Agent": "selfdezign-decap-auth",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
          state,
        }),
      });

      const data = (await tokenRes.json()) as any;
      const token = data?.access_token as string | undefined;

      if (!token) {
        const err = JSON.stringify(data);
        console.error("[DecapAuth] token exchange failed:", err);
        return res.status(500).send(`Token exchange failed: ${err}`);
      }

      // PostMessage robust:
      // 1) către origin-ul calculat
      // 2) fallback către "*" (în caz că există mici diferențe de origin în browser)
      const payloadObj = { token, provider: "github" };
      const payload = JSON.stringify(payloadObj);

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");

      console.log("[DecapAuth] /callback success -> postMessage to", callbackOrigin);

      res.end(`<!doctype html>
<html><head><meta charset="utf-8"></head>
<body>
<script>
(function(){
  var payload = ${payload};
  try {
    if (window.opener && window.opener.postMessage) {
      // strict origin
      try {
        window.opener.postMessage(
          'authorization:github:success:' + JSON.stringify(payload),
          ${JSON.stringify(callbackOrigin)}
        );
      } catch (e) {}

      // fallback
      try {
        window.opener.postMessage(
          'authorization:github:success:' + JSON.stringify(payload),
          '*'
        );
      } catch (e) {}
    }
  } catch (e) {}
  window.close();
})();
</script>
</body></html>`);
    } catch (e: any) {
      console.error("[DecapAuth] callback failed:", e?.message || e);
      res.status(500).send("OAuth callback failed");
    }
  });
}

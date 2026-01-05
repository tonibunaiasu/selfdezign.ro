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

function parseAllowlist(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/[,\s]+/)
    .map((entry) => normalizeOrigin(entry))
    .filter((entry): entry is string => Boolean(entry));
}

export function registerDecapAuth(app: Express) {
  const clientId = env("DECAP_GITHUB_CLIENT_ID");
  const clientSecret = env("DECAP_GITHUB_CLIENT_SECRET");
  // URL-ul site-ului public (exact, cu https + www dacă așa folosești)
  const origin = env("DECAP_ORIGIN").replace(/\/+$/, ""); // ex: https://www.selfdezign.ro
  const normalizedOrigin = normalizeOrigin(origin) ?? origin;
  const allowedOrigins = new Set([
    normalizedOrigin,
    ...parseAllowlist(process.env.DECAP_ORIGIN_ALLOWLIST),
  ]);
  const basePath = "/decap-auth";
  const redirectUri = `${origin}${basePath}/callback`;

  // 1) Start auth: /decap-auth/auth?provider=github&site_id=...
  app.get(`${basePath}/auth`, async (req: Request, res: Response) => {
    const provider = q(req, "provider") ?? "github";
    if (provider !== "github") return res.status(400).send("Only github provider supported");
    const requestedOrigin =
      normalizeOrigin(q(req, "site_url")) ??
      normalizeOrigin(q(req, "site_domain")) ??
      normalizeOrigin(req.headers.origin) ??
      normalizeOrigin(req.headers.referer);
    const allowedOrigin = requestedOrigin && allowedOrigins.has(requestedOrigin)
      ? requestedOrigin
      : undefined;

    const state = crypto.randomBytes(16).toString("hex");
    res.cookie("decap_oauth_state", state, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 10 * 60 * 1000,
      path: basePath,
    });
    if (allowedOrigin) {
      res.cookie("decap_oauth_origin", allowedOrigin, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 10 * 60 * 1000,
        path: basePath,
      });
    }

    const authorize = new URL("https://github.com/login/oauth/authorize");
    authorize.searchParams.set("client_id", clientId);
    authorize.searchParams.set("redirect_uri", redirectUri);
    authorize.searchParams.set("scope", "repo"); // necesar ca să poată face commit
    authorize.searchParams.set("state", state);

    res.redirect(302, authorize.toString());
  });

  // 2) Callback: /decap-auth/callback?code=...&state=...
  app.get(`${basePath}/callback`, async (req: Request, res: Response) => {
    const code = q(req, "code");
    const state = q(req, "state");
    const expectedState = req.cookies?.decap_oauth_state;
    const cookieOrigin = normalizeOrigin(req.cookies?.decap_oauth_origin);
    const callbackOrigin = cookieOrigin && allowedOrigins.has(cookieOrigin)
      ? cookieOrigin
      : normalizedOrigin;

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

      const data = await tokenRes.json() as any;
      const token = data?.access_token as string | undefined;
      if (!token) {
        const err = JSON.stringify(data);
        return res.status(500).send(`Token exchange failed: ${err}`);
      }

      // Netlify/Decap-style postMessage către fereastra care a deschis popup-ul
      const payload = JSON.stringify({ token, provider: "github" });
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(`<!doctype html>
<html><head><meta charset="utf-8"></head>
<body>
<script>
(function(){
  var payload = ${payload};
  try {
    window.opener && window.opener.postMessage(
      'authorization:github:success:' + JSON.stringify(payload),
      ${JSON.stringify(callbackOrigin)}
    );
  } catch (e) {}
  window.close();
})();
</script>
</body></html>`);
    } catch (e: any) {
      res.status(500).send("OAuth callback failed");
    }
  });
}

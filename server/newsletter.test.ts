import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  addSubscriber: vi.fn().mockResolvedValue({ 
    success: true, 
    message: "Te-ai abonat cu succes la newsletter!" 
  }),
  unsubscribe: vi.fn().mockResolvedValue({ 
    success: true, 
    message: "Te-ai dezabonat cu succes." 
  }),
  getActiveSubscribers: vi.fn().mockResolvedValue([
    { id: 1, email: "test@example.com", name: "Test User", isActive: "true" }
  ]),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("newsletter.subscribe", () => {
  it("successfully subscribes a valid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.newsletter.subscribe({
      email: "newuser@example.com",
      name: "New User",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("abonat");
  });

  it("rejects invalid email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.newsletter.subscribe({
        email: "invalid-email",
      })
    ).rejects.toThrow();
  });
});

describe("newsletter.unsubscribe", () => {
  it("successfully unsubscribes an email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.newsletter.unsubscribe({
      email: "test@example.com",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("dezabonat");
  });
});

describe("newsletter.getSubscribers", () => {
  it("allows admin to get subscribers list", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.newsletter.getSubscribers();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("email");
  });

  it("denies non-admin users access to subscribers list", async () => {
    const ctx = createPublicContext();
    ctx.user = {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };
    const caller = appRouter.createCaller(ctx);

    await expect(caller.newsletter.getSubscribers()).rejects.toThrow("permisiunea");
  });
});

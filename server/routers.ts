import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { addSubscriber, unsubscribe, getActiveSubscribers } from "./db";
import { z } from "zod";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Newsletter/Notification subscription
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email("Adresa de email nu este validă"),
        name: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return await addSubscriber(input);
      }),

    unsubscribe: publicProcedure
      .input(z.object({
        email: z.string().email("Adresa de email nu este validă"),
      }))
      .mutation(async ({ input }) => {
        return await unsubscribe(input.email);
      }),

    // Admin only - get all active subscribers
    getSubscribers: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Nu ai permisiunea de a accesa această resursă.");
        }
        return await getActiveSubscribers();
      }),
  }),
});

export type AppRouter = typeof appRouter;

import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { addSubscriber, unsubscribe, getActiveSubscribers, createBlogPost, getBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost } from "./db";
import { z } from "zod";
import { checkRateLimit } from "./_core/rateLimit";
import { TRPCError } from "@trpc/server";

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
      .mutation(async ({ input, ctx }) => {
        try {
          checkRateLimit(ctx, { windowMs: 15 * 60 * 1000, max: 5 });
        } catch (error) {
          if (error instanceof Error && (error as Error & { retryAfter?: number }).message === "RATE_LIMIT") {
            throw new TRPCError({
              code: "TOO_MANY_REQUESTS",
              message: "Prea multe solicitări. Încearcă din nou mai târziu.",
            });
          }
          throw error;
        }
        return await addSubscriber(input);
      }),

    unsubscribe: publicProcedure
      .input(z.object({
        email: z.string().email("Adresa de email nu este validă"),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          checkRateLimit(ctx, { windowMs: 15 * 60 * 1000, max: 10 });
        } catch (error) {
          if (error instanceof Error && (error as Error & { retryAfter?: number }).message === "RATE_LIMIT") {
            throw new TRPCError({
              code: "TOO_MANY_REQUESTS",
              message: "Prea multe solicitări. Încearcă din nou mai târziu.",
            });
          }
          throw error;
        }
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

  // Blog management
  blog: router({
    // Public - get all blog posts
    getPosts: publicProcedure
      .query(async () => {
        return await getBlogPosts();
      }),

    // Public - get single blog post by ID
    getPostById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getBlogPostById(input.id);
      }),

    // Admin only - create blog post
    createPost: protectedProcedure
      .input(z.object({
        slug: z.string().min(1),
        title: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().min(1),
        author: z.string().min(1),
        image: z.string().optional(),
        tags: z.string().optional(),
        faqs: z.string().optional(),
        isPublished: z.enum(["true", "false"]).default("false"),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Nu ai permisiunea de a crea articole.");
        }
        return await createBlogPost(input);
      }),

    // Admin only - update blog post
    updatePost: protectedProcedure
      .input(z.object({
        id: z.number(),
        slug: z.string().optional(),
        title: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        author: z.string().optional(),
        image: z.string().optional(),
        tags: z.string().optional(),
        faqs: z.string().optional(),
        isPublished: z.enum(["true", "false"]).optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Nu ai permisiunea de a edita articole.");
        }
        const { id, ...data } = input;
        return await updateBlogPost(id, data);
      }),

    // Admin only - delete blog post
    deletePost: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Nu ai permisiunea de a șterge articole.");
        }
        return await deleteBlogPost(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;

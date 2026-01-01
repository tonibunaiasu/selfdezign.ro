import { COOKIE_NAME } from "@shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies.js";
import { systemRouter } from "./_core/systemRouter.js";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc.js";
import { addSubscriber, unsubscribe, getActiveSubscribers, createBlogPost, getBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost, getHomeContent, updateHomeContent, getAboutContent, updateAboutContent, getContactContent, updateContactContent, getFooterContent, updateFooterContent, getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from "./db.js";
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

  // Content Management
  content: router({
    // Home content
    getHome: publicProcedure
      .input(z.object({ language: z.string().default('ro') }))
      .query(async ({ input }) => {
        return await getHomeContent(input.language);
      }),

    updateHome: protectedProcedure
      .input(z.object({
        language: z.string().default('ro'),
        heroTitle: z.string().optional(),
        heroSubtitle: z.string().optional(),
        heroDescription: z.string().optional(),
        ctaText: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Nu ai permisiunea de a edita conținut.");
        }
        const { language, ...data } = input;
        return await updateHomeContent(language, data);
      }),

    // About content
    getAbout: publicProcedure
      .input(z.object({ language: z.string().default('ro') }))
      .query(async ({ input }) => {
        return await getAboutContent(input.language);
      }),

    updateAbout: protectedProcedure
      .input(z.object({
        language: z.string().default('ro'),
        aboutText: z.string().optional(),
        visionText: z.string().optional(),
        valuesText: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Nu ai permisiunea de a edita conținut.");
        }
        const { language, ...data } = input;
        return await updateAboutContent(language, data);
      }),

    // Contact content
    getContact: publicProcedure
      .input(z.object({ language: z.string().default('ro') }))
      .query(async ({ input }) => {
        return await getContactContent(input.language);
      }),

    updateContact: protectedProcedure
      .input(z.object({
        language: z.string().default('ro'),
        phone: z.string().optional(),
        email: z.string().optional(),
        address1: z.string().optional(),
        address2: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Nu ai permisiunea de a edita conținut.");
        }
        const { language, ...data } = input;
        return await updateContactContent(language, data);
      }),

    // Footer content
    getFooter: publicProcedure
      .input(z.object({ language: z.string().default('ro') }))
      .query(async ({ input }) => {
        return await getFooterContent(input.language);
      }),

    updateFooter: protectedProcedure
      .input(z.object({
        language: z.string().default('ro'),
        companyName: z.string().optional(),
        companyDescription: z.string().optional(),
        socialLinks: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Nu ai permisiunea de a edita conținut.");
        }
        const { language, ...data } = input;
        return await updateFooterContent(language, data);
      }),

    // Team members
    getTeam: publicProcedure
      .input(z.object({ language: z.string().default('ro') }))
      .query(async ({ input }) => {
        return await getTeamMembers(input.language);
      }),

    createTeamMember: protectedProcedure
      .input(z.object({
        name: z.string(),
        role: z.string(),
        bio: z.string().optional(),
        image: z.string().optional(),
        language: z.string().default('ro'),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Nu ai permisiunea de a adăuga membri.");
        }
        return await createTeamMember(input);
      }),

    updateTeamMember: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        role: z.string().optional(),
        bio: z.string().optional(),
        image: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Nu ai permisiunea de a edita membri.");
        }
        const { id, ...data } = input;
        return await updateTeamMember(id, data);
      }),

    deleteTeamMember: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Nu ai permisiunea de a șterge membri.");
        }
        return await deleteTeamMember(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;

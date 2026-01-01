import { publicProcedure, router } from "./trpc.js";
import { getDb } from "../db.js";
import { 
  teamPageContent, 
  projectsPageContent, 
  projects,
  blogPageContent, 
  mediaPageContent, 
  mediaItems 
} from "../../drizzle/schema.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const cmsRouter = router({
  // Team Page
  getTeamPageContent: publicProcedure.query(async () => {
    const db = await getDb();
    const content = await db.select().from(teamPageContent).limit(1);
    return content[0] || null;
  }),

  updateTeamPageContent: publicProcedure
    .input(z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const existing = await db.select().from(teamPageContent).limit(1);
      
      if (existing.length > 0) {
        await db.update(teamPageContent).set(input).where(eq(teamPageContent.id, existing[0].id));
      } else {
        await db.insert(teamPageContent).values({ ...input, language: "ro" });
      }
      
      return { success: true };
    }),

  // Projects Page
  getProjectsPageContent: publicProcedure.query(async () => {
    const db = await getDb();
    const content = await db.select().from(projectsPageContent).limit(1);
    return content[0] || null;
  }),

  updateProjectsPageContent: publicProcedure
    .input(z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const existing = await db.select().from(projectsPageContent).limit(1);
      
      if (existing.length > 0) {
        await db.update(projectsPageContent).set(input).where(eq(projectsPageContent.id, existing[0].id));
      } else {
        await db.insert(projectsPageContent).values({ ...input, language: "ro" });
      }
      
      return { success: true };
    }),

  // Projects
  getProjects: publicProcedure.query(async () => {
    const db = await getDb();
    return await db.select().from(projects).orderBy(projects.order);
  }),

  getProject: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const result = await db.select().from(projects).where(eq(projects.id, input.id));
      return result[0] || null;
    }),

  createProject: publicProcedure
    .input(z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string().optional(),
      content: z.string().optional(),
      image: z.string().optional(),
      category: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.insert(projects).values({ ...input, language: "ro" });
      return { success: true };
    }),

  updateProject: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
      content: z.string().optional(),
      image: z.string().optional(),
      category: z.string().optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const { id, ...data } = input;
      await db.update(projects).set(data).where(eq(projects.id, id));
      return { success: true };
    }),

  deleteProject: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.delete(projects).where(eq(projects.id, input.id));
      return { success: true };
    }),

  // Blog Page
  getBlogPageContent: publicProcedure.query(async () => {
    const db = await getDb();
    const content = await db.select().from(blogPageContent).limit(1);
    return content[0] || null;
  }),

  updateBlogPageContent: publicProcedure
    .input(z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const existing = await db.select().from(blogPageContent).limit(1);
      
      if (existing.length > 0) {
        await db.update(blogPageContent).set(input).where(eq(blogPageContent.id, existing[0].id));
      } else {
        await db.insert(blogPageContent).values({ ...input, language: "ro" });
      }
      
      return { success: true };
    }),

  // Media Page
  getMediaPageContent: publicProcedure.query(async () => {
    const db = await getDb();
    const content = await db.select().from(mediaPageContent).limit(1);
    return content[0] || null;
  }),

  updateMediaPageContent: publicProcedure
    .input(z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const existing = await db.select().from(mediaPageContent).limit(1);
      
      if (existing.length > 0) {
        await db.update(mediaPageContent).set(input).where(eq(mediaPageContent.id, existing[0].id));
      } else {
        await db.insert(mediaPageContent).values({ ...input, language: "ro" });
      }
      
      return { success: true };
    }),

  // Media Items
  getMediaItems: publicProcedure.query(async () => {
    const db = await getDb();
    return await db.select().from(mediaItems).orderBy(mediaItems.order);
  }),

  createMediaItem: publicProcedure
    .input(z.object({
      title: z.string(),
      description: z.string().optional(),
      image: z.string().optional(),
      link: z.string().optional(),
      type: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.insert(mediaItems).values({ ...input, language: "ro" });
      return { success: true };
    }),

  updateMediaItem: publicProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      link: z.string().optional(),
      type: z.string().optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const { id, ...data } = input;
      await db.update(mediaItems).set(data).where(eq(mediaItems.id, id));
      return { success: true };
    }),

  deleteMediaItem: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.delete(mediaItems).where(eq(mediaItems.id, input.id));
      return { success: true };
    }),
});

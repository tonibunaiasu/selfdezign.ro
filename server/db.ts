import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, subscribers, InsertSubscriber, Subscriber, blogPosts, BlogPost, InsertBlogPost, homeContent, aboutContent, contactContent, footerContent, teamMembers } from "../drizzle/schema.js";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Subscriber/Newsletter functions
export async function addSubscriber(data: { email: string; name?: string }): Promise<{ success: boolean; message: string }> {
  const db = await getDb();
  if (!db) {
    return { success: false, message: "Database not available" };
  }

  try {
    // Check if already subscribed
    const existing = await db.select().from(subscribers).where(eq(subscribers.email, data.email)).limit(1);
    
    if (existing.length > 0) {
      const sub = existing[0];
      if (sub.isActive === "true") {
        return { success: false, message: "Această adresă de email este deja abonată." };
      }
      // Reactivate subscription
      await db.update(subscribers)
        .set({ isActive: "true", unsubscribedAt: null })
        .where(eq(subscribers.email, data.email));
      return { success: true, message: "Abonamentul a fost reactivat cu succes!" };
    }

    // New subscription
    await db.insert(subscribers).values({
      email: data.email,
      name: data.name || null,
    });
    return { success: true, message: "Te-ai abonat cu succes la newsletter!" };
  } catch (error) {
    console.error("[Database] Failed to add subscriber:", error);
    return { success: false, message: "A apărut o eroare. Te rugăm să încerci din nou." };
  }
}

export async function unsubscribe(email: string): Promise<{ success: boolean; message: string }> {
  const db = await getDb();
  if (!db) {
    return { success: false, message: "Database not available" };
  }

  try {
    const existing = await db.select().from(subscribers).where(eq(subscribers.email, email)).limit(1);
    
    if (existing.length === 0) {
      return { success: false, message: "Această adresă de email nu este abonată." };
    }

    await db.update(subscribers)
      .set({ isActive: "false", unsubscribedAt: new Date() })
      .where(eq(subscribers.email, email));
    
    return { success: true, message: "Te-ai dezabonat cu succes." };
  } catch (error) {
    console.error("[Database] Failed to unsubscribe:", error);
    return { success: false, message: "A apărut o eroare. Te rugăm să încerci din nou." };
  }
}

export async function getActiveSubscribers(): Promise<Subscriber[]> {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(subscribers).where(eq(subscribers.isActive, "true"));
  return result;
}

// Blog Post functions
export async function createBlogPost(data: InsertBlogPost): Promise<BlogPost> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(blogPosts).values(data);
    const insertedId = result[0].insertId;
    const post = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(insertedId))).limit(1);
    if (!post.length) throw new Error("Failed to create blog post");
    return post[0];
  } catch (error) {
    console.error("[Database] Failed to create blog post:", error);
    throw error;
  }
}

export async function getBlogPosts(limitNum?: number): Promise<BlogPost[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const query = db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    const result = limitNum ? await query.limit(limitNum) : await query;
    return result;
  } catch (error) {
    console.error("[Database] Failed to get blog posts:", error);
    return [];
  }
}

export async function getBlogPostById(id: number): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get blog post:", error);
    return undefined;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get blog post by slug:", error);
    return undefined;
  }
}

export async function updateBlogPost(id: number, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  try {
    await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
    return await getBlogPostById(id);
  } catch (error) {
    console.error("[Database] Failed to update blog post:", error);
    throw error;
  }
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete blog post:", error);
    throw error;
  }
}


// Content Management functions
export async function getHomeContent(language: string = 'ro'): Promise<any> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(homeContent).where(eq(homeContent.language, language)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get home content:", error);
    return null;
  }
}

export async function updateHomeContent(language: string, data: any): Promise<any> {
  const db = await getDb();
  if (!db) return null;

  try {
    const existing = await getHomeContent(language);
    if (existing && Object.keys(data).length > 0) {
      await db.update(homeContent).set(data).where(eq(homeContent.language, language));
    } else if (!existing) {
      await db.insert(homeContent).values({ ...data, language });
    }
    return await getHomeContent(language);
  } catch (error) {
    console.error("[Database] Failed to update home content:", error);
    throw error;
  }
}

export async function getAboutContent(language: string = 'ro'): Promise<any> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(aboutContent).where(eq(aboutContent.language, language)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get about content:", error);
    return null;
  }
}

export async function updateAboutContent(language: string, data: any): Promise<any> {
  const db = await getDb();
  if (!db) return null;

  try {
    const existing = await getAboutContent(language);
    if (existing && Object.keys(data).length > 0) {
      await db.update(aboutContent).set(data).where(eq(aboutContent.language, language));
    } else if (!existing) {
      await db.insert(aboutContent).values({ ...data, language });
    }
    return await getAboutContent(language);
  } catch (error) {
    console.error("[Database] Failed to update about content:", error);
    throw error;
  }
}

export async function getContactContent(language: string = 'ro'): Promise<any> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(contactContent).where(eq(contactContent.language, language)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get contact content:", error);
    return null;
  }
}

export async function updateContactContent(language: string, data: any): Promise<any> {
  const db = await getDb();
  if (!db) return null;

  try {
    const existing = await getContactContent(language);
    if (existing && Object.keys(data).length > 0) {
      await db.update(contactContent).set(data).where(eq(contactContent.language, language));
    } else if (!existing) {
      await db.insert(contactContent).values({ ...data, language });
    }
    return await getContactContent(language);
  } catch (error) {
    console.error("[Database] Failed to update contact content:", error);
    throw error;
  }
}

export async function getFooterContent(language: string = 'ro'): Promise<any> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(footerContent).where(eq(footerContent.language, language)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get footer content:", error);
    return null;
  }
}

export async function updateFooterContent(language: string, data: any): Promise<any> {
  const db = await getDb();
  if (!db) return null;

  try {
    const existing = await getFooterContent(language);
    if (existing && Object.keys(data).length > 0) {
      await db.update(footerContent).set(data).where(eq(footerContent.language, language));
    } else if (!existing) {
      await db.insert(footerContent).values({ ...data, language });
    }
    return await getFooterContent(language);
  } catch (error) {
    console.error("[Database] Failed to update footer content:", error);
    throw error;
  }
}

// Team management
export async function getTeamMembers(language: string = 'ro'): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select().from(teamMembers).where(eq(teamMembers.language, language));
  } catch (error) {
    console.error("[Database] Failed to get team members:", error);
    return [];
  }
}

export async function createTeamMember(data: any): Promise<any> {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(teamMembers).values(data);
    return data;
  } catch (error) {
    console.error("[Database] Failed to create team member:", error);
    throw error;
  }
}

export async function updateTeamMember(id: number, data: any): Promise<any> {
  const db = await getDb();
  if (!db) return null;

  try {
    await db.update(teamMembers).set(data).where(eq(teamMembers.id, id));
    const result = await db.select().from(teamMembers).where(eq(teamMembers.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to update team member:", error);
    throw error;
  }
}

export async function deleteTeamMember(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  try {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete team member:", error);
    throw error;
  }
}

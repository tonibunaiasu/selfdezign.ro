import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, subscribers, InsertSubscriber, Subscriber } from "../drizzle/schema";
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

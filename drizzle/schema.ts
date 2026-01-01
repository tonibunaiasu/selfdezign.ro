import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Newsletter/Notification Subscriptions
export const subscribers = mysqlTable("subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  isActive: mysqlEnum("isActive", ["true", "false"]).default("true").notNull(),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;

// Blog posts stored in database for dynamic management
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  image: varchar("image", { length: 500 }),
  tags: text("tags"), // JSON string array
  faqs: text("faqs"), // JSON string array of {question, answer}
  isPublished: mysqlEnum("isPublished", ["true", "false"]).default("false").notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// Home Page Content
export const homeContent = mysqlTable("homeContent", {
  id: int("id").autoincrement().primaryKey(),
  heroTitle: text("heroTitle"),
  heroSubtitle: text("heroSubtitle"),
  heroImage: varchar("heroImage", { length: 500 }),
  featuredProjectId: varchar("featuredProjectId", { length: 255 }),
  testimonialsSectionTitle: varchar("testimonialsSectionTitle", { length: 500 }),
  language: varchar("language", { length: 10 }).default("ro").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HomeContent = typeof homeContent.$inferSelect;
export type InsertHomeContent = typeof homeContent.$inferInsert;

// About Page Content
export const aboutContent = mysqlTable("aboutContent", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }),
  description: text("description"),
  image: varchar("image", { length: 500 }),
  language: varchar("language", { length: 10 }).default("ro").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AboutContent = typeof aboutContent.$inferSelect;
export type InsertAboutContent = typeof aboutContent.$inferInsert;

// Vision Page Content
export const visionContent = mysqlTable("visionContent", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }),
  description: text("description"),
  language: varchar("language", { length: 10 }).default("ro").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type VisionContent = typeof visionContent.$inferSelect;
export type InsertVisionContent = typeof visionContent.$inferInsert;

// Values Page Content
export const valuesContent = mysqlTable("valuesContent", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }),
  description: text("description"),
  language: varchar("language", { length: 10 }).default("ro").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ValuesContent = typeof valuesContent.$inferSelect;
export type InsertValuesContent = typeof valuesContent.$inferInsert;

// Team Members
export const teamMembers = mysqlTable("teamMembers", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }),
  description: text("description"),
  image: varchar("image", { length: 500 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  order: int("order").default(0),
  language: varchar("language", { length: 10 }).default("ro").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = typeof teamMembers.$inferInsert;

// Contact Page Content
export const contactContent = mysqlTable("contactContent", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }),
  description: text("description"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  address1: text("address1"),
  address2: text("address2"),
  language: varchar("language", { length: 10 }).default("ro").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContactContent = typeof contactContent.$inferSelect;
export type InsertContactContent = typeof contactContent.$inferInsert;

// Footer Content
export const footerContent = mysqlTable("footerContent", {
  id: int("id").autoincrement().primaryKey(),
  companyName: varchar("companyName", { length: 255 }),
  companyDescription: text("companyDescription"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  socialFacebook: varchar("socialFacebook", { length: 500 }),
  socialInstagram: varchar("socialInstagram", { length: 500 }),
  socialLinkedin: varchar("socialLinkedin", { length: 500 }),
  language: varchar("language", { length: 10 }).default("ro").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FooterContent = typeof footerContent.$inferSelect;
export type InsertFooterContent = typeof footerContent.$inferInsert;

// SEO Metadata
export const seoMetadata = mysqlTable("seoMetadata", {
  id: int("id").autoincrement().primaryKey(),
  page: varchar("page", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }),
  description: text("description"),
  keywords: text("keywords"),
  ogImage: varchar("ogImage", { length: 500 }),
  language: varchar("language", { length: 10 }).default("ro").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SeoMetadata = typeof seoMetadata.$inferSelect;
export type InsertSeoMetadata = typeof seoMetadata.$inferInsert;

// Content Versions/History
export const contentHistory = mysqlTable("contentHistory", {
  id: int("id").autoincrement().primaryKey(),
  page: varchar("page", { length: 255 }).notNull(),
  contentType: varchar("contentType", { length: 255 }).notNull(),
  contentId: int("contentId"),
  previousData: text("previousData"),
  newData: text("newData"),
  changedBy: int("changedBy"),
  changeDescription: text("changeDescription"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContentHistory = typeof contentHistory.$inferSelect;
export type InsertContentHistory = typeof contentHistory.$inferInsert;

import { pgTable, text, serial, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const BlockType = z.enum([
  "if-statement",
  "for-loop", 
  "while-loop",
  "variable",
  "function",
  "event-listener",
  "button",
  "text-input",
  "div",
  "text",
  "css-style",
  "console-log",
  "alert"
]);

export const blockSchema = z.object({
  id: z.string(),
  type: BlockType,
  x: z.number(),
  y: z.number(),
  properties: z.record(z.any()),
  connections: z.array(z.string()).optional()
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  blocks: z.array(blockSchema),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  blocks: json("blocks").$type<Block[]>().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type Block = z.infer<typeof blockSchema>;
export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type ProjectRow = typeof projects.$inferSelect;

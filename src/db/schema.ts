import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { generateUUIDv7 } from "../utils/uuid";

//@tags: contests
export const contests = sqliteTable("contests ", {
    id: text("id").primaryKey().default(generateUUIDv7()),
    name: text("name"),
    gift: text("gift"),
    key: text("key").default(generateUUIDv7()),
    minChallengers: integer("min_challengers"),
    maxChallengers: integer("max_challengers"),
    startDate: integer("start_date"),
    endDate: integer("end_date"),
    createdAt: integer("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at").default(sql`CURRENT_TIMESTAMP`),
    deletedAt: integer("deleted_at"),
    isActive: integer("is_active").default(1),

});

//@tags: challengers
export const challengers = sqliteTable('challengers', {
    id: text("id").primaryKey().default(generateUUIDv7()),
    contestId: text("contest_id").references(() => contests.id),
    name: text("name"),
    email: text("email"),
    createdAt: integer("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at").default(sql`CURRENT_TIMESTAMP`),
    deletedAt: integer("deleted_at"),
    isActive: integer("is_active").default(1),
})
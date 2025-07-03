import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { contests } from "../../db/schema";
import type { Contest } from "./contest.type";

const service =  {
    async createContest(contest: Contest): Promise<Contest> {
        const { name, gift, minChallengers, maxChallengers, startDate, endDate } = contest;
        if (!name || !minChallengers || !maxChallengers || !startDate || !endDate) {
            throw new Error("Missing required fields", { cause: contest });
        }
        if (minChallengers > maxChallengers) {
            throw new Error("Min challengers must be less than max challengers");
        }
        if (startDate > endDate) {  
            throw new Error("Start date must be before end date");
        }
        if (minChallengers < 1) {
            throw new Error("Min challengers must be at least 1");
        }
        if (maxChallengers < minChallengers) {
            throw new Error("Max challengers must be greater than min challengers");
        }
        if (startDate < Date.now()) {
            throw new Error("Start date must be in the future");
        }
        if (endDate < Date.now()) {
            throw new Error("End date must be in the future");
        }
        try {
            const result = await db.insert(contests).values(contest as any).returning();
            return result[0] as unknown as Contest;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async getContest(key: string): Promise<Contest | null> {
        if (!key) {
            throw new Error("Key is required");
        }
        if (key.length !== 36) {
            throw new Error("Key must be a valid UUID v7");
        }
        
        try {
            const result = await db.select().from(contests).where(eq(contests.key, key));
            return result[0] as unknown as Contest | null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default service;
import { db } from "@/db/db";
import type { Challenger } from "./challenger.type";
import { challengers } from "@/db/schema";
import { and, eq } from "drizzle-orm";           

const service = {
    async createChallenger(challenger: Challenger): Promise<Challenger> {
        const { name, email, contestId } = challenger;
        if (!name || !email || !contestId) {
            throw new Error("Missing required fields", { cause: challenger });
        }
    
            try {
                const result = await db.insert(challengers).values({
                    id: crypto.randomUUID(),
                    name,
                    email,
                    contestId,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    deletedAt: null,
                    isActive: 1,

                }).returning();
                return result[0] as unknown as Challenger;
            } catch (error) {
                console.error(error);
                throw error;
            }
    },
        async getChallengers(contestId: string): Promise<Challenger[]> {
        const result = await db.select().from(challengers).where(and(eq(challengers.contestId, contestId), eq(challengers.isActive, 1)));
        return result as unknown as Challenger[];
    },
    async updateChallenger(challenger: Challenger): Promise<Challenger> {
        const { id, name, email, contestId } = challenger;
        if (!id || !name || !email || !contestId) {
            throw new Error("Missing required fields", { cause: challenger });
        }
        try {
            const result = await db.update(challengers).set({
                name,
                email,
                contestId,
            }).where(eq(challengers.id, id)).returning();
            return result[0] as unknown as Challenger;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    async deleteChallenger(id: string): Promise<void> {
        try {
            const result = await db.update(challengers).set({
                deletedAt: Date.now(),
                isActive: 0,
            }).where(eq(challengers.id, id)).returning();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default service;
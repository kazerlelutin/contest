import type { Challenger } from "@/features/challenger/challenger.type";
import { createContest } from "@/features/contest/contest.create";
import challengerService from "@/features/challenger/challenger.service";
import type { BunRequest } from "bun";
import service from "@/features/contest/contest.service";

export const apiRoutes = {
  '/api/contest': {
    POST: createContest
  },
  '/api/challenger': {
    POST:async (req: BunRequest) => {
      const challenger = await req.json();
      try {
        const result = await challengerService.createChallenger(challenger);
        return Response.json(result);
      } catch (error) {
        return Response.json({ error: "Failed to create challenger" }, { status: 500 });
      }
    }
  },
  '/api/challengers/:contestId': {
    GET: async (req: BunRequest) => {
      const { contestId } = req.params as { contestId: string };
      try {
        const result = await challengerService.getChallengers(contestId);
        return Response.json(result);
      } catch (error) {
        return Response.json({ error: "Failed to get challengers" }, { status: 500 });
      }
    }
  },
  '/api/challenger/:id': {
    PUT: async (req: BunRequest) => {
      const { id } = req.params as { id: string };
      const challenger = await req.json();
      try {
        const result = await challengerService.updateChallenger({ ...challenger, id: id });
        return Response.json(result);
      } catch (error) {
        return Response.json({ error: "Failed to update challenger" }, { status: 500 });
      }
    },
    DELETE: async (req: BunRequest) => {
      const { id } = req.params as { id: string };
      try {
          const result = await challengerService.deleteChallenger(id);
        return Response.json(result);
      } catch (error) {
        return Response.json({ error: "Failed to delete challenger" }, { status: 500 });
      }
    }
  }
}

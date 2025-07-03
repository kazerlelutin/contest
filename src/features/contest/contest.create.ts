import service from "./contest.service";

export async function createContest(req: Request) {

    const body = await req.json();
 
    try {   
        const contest = await service.createContest(body);
        return Response.json(contest, { status: 200 });
    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
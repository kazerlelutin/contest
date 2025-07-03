import type { Contest } from "./contest.type";

const LS_KEY = "_contest";

export function getContestsFromLocalStorage(): Contest[] | null {
    const contest = localStorage.getItem(LS_KEY);
    return contest ? JSON.parse(contest) : null;
}

export function setContestsToLocalStorage(contest: Contest) {
    const contests = getContestsFromLocalStorage() || [];
    const contestsMap = new Map(contests.map(c => [c.id, c]));
    contestsMap.set(contest.id, contest);
    localStorage.setItem(LS_KEY, JSON.stringify(Array.from(contestsMap.values())));
}

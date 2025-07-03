import { ContestCreateForm } from "@/features/contest/contest.createForm";
import { getContestsFromLocalStorage } from "@/features/contest/contest.local";
import type { Contest } from "@/features/contest/contest.type";
import { useEffect, useState } from "react";

export function Home() {
  const [visitedContests, setVisitedContests] = useState<Contest[]>([]);

  useEffect(() => {
    const contests = getContestsFromLocalStorage();
    if (contests) {
      setVisitedContests(contests);
    }
  }, []);

  const handleContestClick = (contest: Contest) => {
    window.location.href = `/contest/${contest.key}`;
  }

  return (
    <div className="home">
      <ContestCreateForm />
      <div className="visited-contests">
        {visitedContests.map((contest) => (
          <div key={contest.id} onClick={() => handleContestClick(contest)}>
            {contest.name}
          </div>
        ))}
      </div>
    </div>
  );
}



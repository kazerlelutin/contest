import { UpdatableList } from "@/features/challenger/challenger.updatableList";
import { setContestsToLocalStorage } from "@/features/contest/contest.local";
import type { Contest } from "@/features/contest/contest.type";
import { useEffect } from "react";

export function Contest({ contest }: { contest?: Contest }) {

  useEffect(() => {
    if (contest)
      setContestsToLocalStorage(contest);

  }, [contest]);
  return (
    <div className="contest">
      <h1 className="contest-name">{contest?.name}</h1>
      <p className="contest-gift">{contest?.gift}</p>
      <p className="contest-start-date">
        {new Date(contest?.startDate || 0).toLocaleDateString()} -
        {new Date(contest?.startDate || 0).toLocaleTimeString()}
      </p>
      <p className="contest-end-date">
        {new Date(contest?.endDate || 0).toLocaleDateString()} -
        {new Date(contest?.endDate || 0).toLocaleTimeString()}
      </p>

      <UpdatableList contestId={contest?.id} />
    </div>
  );
}



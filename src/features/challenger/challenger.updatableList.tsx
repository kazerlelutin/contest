import { useEffect, useState } from "react";
import type { Challenger } from "./challenger.type";

export function UpdatableList({ contestId }: { contestId: number | undefined }) {

    const [challengers, setChallengers] = useState<Challenger[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchChallengers = async () => {
        if (!contestId) {
            return;
        }
        const response = await fetch(`/api/challengers/${contestId}`);
        const data = await response.json();
        setChallengers(data);
    }

    const addChallenger = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const challenger = {
            name,
            email,
            contestId,
        }
        try {
            const response = await fetch(`/api/challenger`, {
                method: "POST",
                body: JSON.stringify(challenger),
            });
            if (!response.ok) {
                throw new Error("Error adding challenger");
            }
            const data = await response.json();
            setChallengers([...challengers, data]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const updateChallenger = async (challenger: Challenger) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/challenger/${challenger.id}`, {
                method: "PUT",
                body: JSON.stringify(challenger),
            });
            const data = await response.json();
            setChallengers(challengers.map((c) => c.id === challenger.id ? data : c));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteChallenger = async (challenger: Challenger) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/challenger/${challenger.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setChallengers(challengers.filter((c) => c.id !== challenger.id));
            } else {
                let errorMessage = "Error deleting challenger";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    errorMessage = "Error deleting challenger";
                }
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchChallengers();
    }, [contestId]);

    return (
        <div>
            {
                challengers.map((challenger) => (
                    <div key={challenger.id}>
                        <input type="text" value={challenger.name} onChange={(e) => updateChallenger({ ...challenger, name: e.target.value })} />
                        <input type="email" value={challenger.email} onChange={(e) => updateChallenger({ ...challenger, email: e.target.value })} />
                        <button onClick={() => deleteChallenger(challenger)}>Delete</button>
                    </div>
                ))
            }
            {
                isLoading && <div>Loading...</div>
            }

            <form onSubmit={addChallenger} className="challenger-form">
                <fieldset>

                    <label>Name <span>*</span></label>
                    <input type="text" name="name" />
                </fieldset>
                <fieldset>
                    <label>Email <span>*</span></label>
                    <input type="email" name="email" />
                </fieldset>
                <button type="submit">Add Challenger</button>
            </form>

        </div>
    );
}
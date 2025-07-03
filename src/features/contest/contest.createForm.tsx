import { useState } from "react";

export function ContestCreateForm() {

    const [formData, setFormData] = useState({
        name: "",
        gift: "",
        minChallengers: 0,
        maxChallengers: 0,
        startDate: "",
        endDate: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch("/api/contest", {
                method: "POST",
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Error creating contest");
            } else if (response.status === 200) {
                const data = await response.json();
                window.location.href = `/contest/${data.key}`;
            } else {
                throw new Error("Error creating contest");
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
       <form className="contest-create-form" onSubmit={handleSubmit}>
        <input type="text" name="name" autoComplete="off" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="text" name="gift" placeholder="Gift" value={formData.gift} onChange={handleChange} />
        <input type="number" name="minChallengers" placeholder="Min Challengers" value={formData.minChallengers} onChange={handleChange} />
        <input type="number" name="maxChallengers" placeholder="Max Challengers" value={formData.maxChallengers} onChange={handleChange} />
        <input type="datetime-local" name="startDate" placeholder="Start Date" value={formData.startDate} onChange={handleChange} />
        <input type="datetime-local" name="endDate" placeholder="End Date" value={formData.endDate} onChange={handleChange} />
        <button type="submit">Create Contest</button>
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
       </form>
    );
}

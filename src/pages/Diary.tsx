import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import useAuth from "../hooks/useAuth";
import AddEntryModal from "../components/AddEntryModal";

type Entry = {
    id: number;
    title: string;
    body: string;
    created_at: string;
};

const Diary = () => {
    const { auth, loading } = useAuth();
    const [entries, setEntries] = useState<Entry[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (loading) {
            return;
        } else {
            axios
                .get(`${baseUrl}/entries/`, {
                    headers: { Authorization: "Bearer " + auth.accessToken },
                    withCredentials: true,
                })
                .then((response) => {
                    setEntries(response.data);
                })
                .catch((error) => {
                    console.error(error.response);
                });
        }
    }, [loading, auth]);

    return (
        <div>
            <h1>Diary</h1>
            <button type="button" onClick={() => setModalOpen(true)}>
                New Entry
            </button>
            {modalOpen ? (
                <AddEntryModal
                    setModalOpen={setModalOpen}
                    setEntries={setEntries}
                />
            ) : null}
            <div>
                {entries.length > 0 ? (
                    entries.map((entry) => (
                        <div key={entry.id}>
                            <h2>{entry.title}</h2>
                            <p>{entry.created_at}</p>
                            <p>{entry.body}</p>
                        </div>
                    ))
                ) : (
                    <p>No entries yet.</p>
                )}
            </div>
        </div>
    );
};

export default Diary;

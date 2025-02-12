import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AddEntryModal from "../components/AddEntryModal";
import useAxios from "../hooks/useAxios";

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
    const axiosInstance = useAxios();

    useEffect(() => {
        if (loading) {
            return;
        } else {
            axiosInstance
                .get(`/entries/?author=${auth.userId}`)
                .then((response) => {
                    setEntries(response.data);
                })
                .catch((error) => {
                    console.error(error.response);
                });
        }
    }, [loading, auth]);

    const handleDeleteEntry = (id: number) => {
        axiosInstance.delete(`/entries/${id}/`).then(() => {
            axiosInstance
                .get(`/entries/?author=${auth.userId}`)
                .then((response) => {
                    setEntries(response.data);
                })
                .catch((error) => {
                    console.error(
                        "Error while fetching entries: ",
                        error.response
                    );
                });
        });
    };

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
                            <button
                                type="button"
                                onClick={() => handleDeleteEntry(entry.id)}
                            >
                                Delete Entry
                            </button>
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

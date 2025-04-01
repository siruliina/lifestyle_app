import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AddEntryModal from "../components/AddEntryModal";
import useAxios from "../hooks/useAxios";
import Select, { SingleValue } from "react-select";
import { Option, EntryFilters, Entry } from "../utils/types";
import "../css/general/forms.css";

const order_options = [
    {
        label: "Newest to oldest",
        value: "-created_at",
        name: "order",
    },
    {
        label: "Oldest to newest",
        value: "created_at",
        name: "order",
    },
    {
        label: "Title A-Z",
        value: "title",
        name: "order",
    },
    {
        label: "Title Z-A",
        value: "-title",
        name: "order",
    },
];

const Diary = () => {
    const { auth, loading } = useAuth();
    const [entries, setEntries] = useState<Entry[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const axiosInstance = useAxios();
    const [filters, setFilters] = useState<EntryFilters>({
        order: "-created_at",
        date: "",
        search: "",
    });

    const fetchEntries = () => {
        const params = {
            created_at: filters.date,
            ordering: filters.order,
            search: filters.search,
            author: auth.userId,
        };

        axiosInstance
            .get(`/entries/`, { params })
            .then((response) => {
                setEntries(response.data);
            })
            .catch((error) => {
                console.error(error.response);
            });
    };

    useEffect(() => {
        if (loading) {
            return;
        } else {
            fetchEntries();
        }
    }, [loading, auth, filters]);

    // Function for handling the order select element's changes
    const handleSelectChange = (selectedOption: SingleValue<Option>) => {
        if (selectedOption) {
            // Extracting name and value of option
            const { name, value } = selectedOption;

            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: value,
            }));
        }
    };

    // Function for handling the search and date input field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Extracting name and value of event
        const { name, value } = e.target;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Function to handle deletion of an entry when clicking "Delete Entry" button
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
        <div className="spaced-vertical-flex">
            <h1>Diary</h1>
            <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="green-button"
            >
                New Entry
            </button>
            {modalOpen ? (
                <AddEntryModal
                    setModalOpen={setModalOpen}
                    setEntries={setEntries}
                />
            ) : null}

            <form className="filters-wrapper">
                <Select
                    name="order"
                    options={order_options}
                    onChange={handleSelectChange}
                    placeholder="Order"
                    className="filter"
                />
                <input
                    type="date"
                    name="date"
                    onChange={handleInputChange}
                    className="filter"
                />
                <input
                    type="text"
                    name="search"
                    onChange={handleInputChange}
                    placeholder="Search by title"
                    className="filter"
                />
            </form>

            <div className="spaced-vertical-flex">
                {entries.length > 0 ? (
                    entries.map((entry) => (
                        <div key={entry.id} className="box">
                            <h2>{entry.title}</h2>
                            <p>{entry.created_at}</p>
                            <p>{entry.body}</p>
                            <button
                                type="button"
                                onClick={() => handleDeleteEntry(entry.id)}
                                className="pink-button"
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

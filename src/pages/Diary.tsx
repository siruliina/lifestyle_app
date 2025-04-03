import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import Select, { SingleValue } from "react-select";
import { Option, EntryFilters, Entry as EntryType } from "../utils/types";
import "../css/pages/Diary.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import EntryModal from "../components/EntryModal";
import Entry from "../components/Entry";

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
    const [entries, setEntries] = useState<EntryType[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const axiosInstance = useAxios();
    const [filters, setFilters] = useState<EntryFilters>({
        order: "-created_at",
        date: "",
        search: "",
        favorite: "",
    });
    const [initialEntry, setInitialEntry] = useState<EntryType | null>(null);

    const fetchEntries = () => {
        const params = {
            created_at: filters.date,
            ordering: filters.order,
            search: filters.search,
            author: auth.userId,
            favorite: filters.favorite,
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

    // Function for handling the favorite filter changes
    const handleFavoriteFilter = () => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            favorite: filters.favorite === true ? "" : !filters.favorite,
        }));
    };

    return (
        <div className="spaced-vertical-flex">
            <h1>Diary</h1>
            <Button
                type="button"
                onClick={() => setModalOpen(true)}
                className="green-button"
            >
                New Entry
            </Button>
            {modalOpen ? (
                <EntryModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    fetchEntries={fetchEntries}
                    initialEntry={initialEntry ? initialEntry : undefined}
                    setInitialEntry={setInitialEntry}
                />
            ) : null}

            <Form className="filters-wrapper">
                <Select
                    name="order"
                    options={order_options}
                    onChange={handleSelectChange}
                    placeholder="Order"
                    className="filter"
                />
                <Form.Control
                    type="date"
                    name="date"
                    onChange={handleInputChange}
                    className="filter"
                />
                <Form.Control
                    type="text"
                    name="search"
                    onChange={handleInputChange}
                    placeholder="Search by title"
                    className="filter"
                />
                {filters.favorite ? (
                    <FaHeart
                        className="heart"
                        onClick={() => handleFavoriteFilter()}
                        style={{ color: "var(--pink)" }}
                    />
                ) : (
                    <FaRegHeart
                        className="heart"
                        onClick={() => handleFavoriteFilter()}
                    />
                )}
            </Form>

            <div className="spaced-vertical-flex">
                {entries.length > 0 ? (
                    entries.map((entry) => (
                        <Entry
                            key={entry.id}
                            entry={entry}
                            fetchEntries={fetchEntries}
                            setInitialEntry={setInitialEntry}
                            setModalOpen={setModalOpen}
                        />
                    ))
                ) : (
                    <p>No entries yet.</p>
                )}
            </div>
        </div>
    );
};

export default Diary;

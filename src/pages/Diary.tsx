import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import Select, { SingleValue } from "react-select";
import { Option, EntryFilters, Entry } from "../utils/types";
import "../css/pages/Diary.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Card, Form } from "react-bootstrap";
import EntryModal from "../components/EntryModal";

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
        favorite: "",
    });
    const [initialEntry, setInitialEntry] = useState<Entry | null>(null);

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

    // Function that handles the favoriting of an entry
    const handleFavoriteEntry = (entryId: number) => {
        axiosInstance
            .post(`/entries/${entryId}/toggle_favorite/`, {})
            .then(() => {
                fetchEntries();
            });
    };

    // Function to handle deletion of an entry when clicking "Delete Entry" button
    const handleDeleteEntry = (id: number) => {
        axiosInstance.delete(`/entries/${id}/`).then(() => {
            fetchEntries();
        });
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
                        <Card key={entry.id} className="box">
                            <Card.Body>
                                <div className="title-more-row">
                                    <Card.Title>{entry.title}</Card.Title>
                                    <div className="icons-flex">
                                        {entry.favorite ? (
                                            <FaHeart
                                                className="heart"
                                                onClick={() =>
                                                    handleFavoriteEntry(
                                                        entry.id
                                                    )
                                                }
                                                style={{ color: "var(--pink)" }}
                                            />
                                        ) : (
                                            <FaRegHeart
                                                className="heart"
                                                onClick={() =>
                                                    handleFavoriteEntry(
                                                        entry.id
                                                    )
                                                }
                                            />
                                        )}

                                        <Dropdown>
                                            <Dropdown.Toggle
                                                id="dropdown-basic"
                                                className="icon-button"
                                            >
                                                More
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        setInitialEntry(entry);
                                                        setModalOpen(true);
                                                    }}
                                                >
                                                    Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() =>
                                                        handleDeleteEntry(
                                                            entry.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <Card.Text>
                                    {entry.created_at}
                                    <br />

                                    {entry.body.substring(0, 300)}
                                    {entry.body.length > 300 ? "..." : null}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No entries yet.</p>
                )}
            </div>
        </div>
    );
};

export default Diary;

import { Card, Dropdown } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Entry as EntryType } from "../utils/types";
import useAxios from "../hooks/useAxios";

type EntryProps = {
    entry: EntryType;
    fetchEntries: () => void;
    setInitialEntry: (initialEntry: EntryType) => void;
    setModalOpen: (modalOpen: boolean) => void;
};

const Entry: React.FC<EntryProps> = ({
    entry,
    fetchEntries,
    setInitialEntry,
    setModalOpen,
}) => {
    const axiosInstance = useAxios();

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
        <Card key={entry.id} className="box">
            <Card.Body>
                <div className="title-more-row">
                    <Card.Title>{entry.title}</Card.Title>
                    <div className="icons-flex">
                        {entry.favorite ? (
                            <FaHeart
                                className="heart"
                                onClick={() => handleFavoriteEntry(entry.id)}
                                style={{ color: "var(--pink)" }}
                            />
                        ) : (
                            <FaRegHeart
                                className="heart"
                                onClick={() => handleFavoriteEntry(entry.id)}
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
                                    onClick={() => handleDeleteEntry(entry.id)}
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
    );
};

export default Entry;

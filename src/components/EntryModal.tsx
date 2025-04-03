import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { Button, Form, Modal } from "react-bootstrap";
import { Entry } from "../utils/types";

type EntryModalProps = {
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    fetchEntries: () => void;
    initialEntry?: Entry;
    setInitialEntry: (initialEntry: Entry | null) => void;
};

type EntryFormData = {
    title: string;
    body: string;
};

const EntryModal: React.FC<EntryModalProps> = ({
    modalOpen,
    setModalOpen,
    fetchEntries,
    initialEntry,
    setInitialEntry,
}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<EntryFormData>({
        mode: "onChange",
        defaultValues: {
            title: initialEntry?.title || "",
            body: initialEntry?.body || "",
        },
    });
    const { auth } = useAuth();
    const axiosInstance = useAxios();

    const handleAddEditEntry: SubmitHandler<EntryFormData> = (data) => {
        const updatedEntry = {
            title: data.title,
            body: data.body,
            author: auth.userId,
        };

        // If there is an initial entry, we will edit it with PUT
        if (initialEntry) {
            axiosInstance
                .put(`/entries/${initialEntry.id}/`, updatedEntry)
                .then(() => {
                    fetchEntries();
                    setInitialEntry(null);
                    setModalOpen(false);
                })
                .catch((error) => {
                    console.error(
                        "Error while updating entry:",
                        error.response
                    );
                });
            // Else we will create a new entry with POST
        } else {
            axiosInstance
                .post(`/entries/`, updatedEntry)
                .then(() => {
                    fetchEntries();
                    setModalOpen(false);
                })
                .catch((error) => {
                    console.error(
                        "Error while creating entry:",
                        error.response
                    );
                });
        }
    };

    return (
        <Modal
            show={modalOpen}
            onHide={() => {
                setModalOpen(false);
                setInitialEntry(null);
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {initialEntry ? "Edit diary entry" : "Add Diary Entry"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleAddEditEntry)}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="title">Title</Form.Label>
                        <Form.Control
                            type="text"
                            id="title"
                            {...register("title", {
                                required: "Please choose a title.",
                            })}
                        />
                        {errors.title && (
                            <p className="error-message">
                                {errors.title.message}
                            </p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="body">Body</Form.Label>
                        <Form.Control
                            as="textarea"
                            id="body"
                            rows={4}
                            {...register("body", {
                                required:
                                    "Please write something for the body.",
                            })}
                        />
                        {errors.body && (
                            <p className="error-message">
                                {errors.body.message}
                            </p>
                        )}
                    </Form.Group>

                    <Modal.Footer
                        className="buttons"
                        style={{ padding: "1rem 0 0 0" }}
                    >
                        <Button type="submit" className="green-button">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EntryModal;

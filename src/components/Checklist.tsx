import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Checklist as ChecklistType } from "../utils/types";
import { useForm, SubmitHandler } from "react-hook-form";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

type ChecklistProps = {
    checklist?: ChecklistType;
    fetchChecklists: () => void;
};

type ChecklistItemToAdd = {
    title: string;
    finished: boolean;
};

type CreateChecklistFormData = {
    checklistTitle: string;
    checklistDescription: string;
};

const Checklist: React.FC<ChecklistProps> = ({
    checklist,
    fetchChecklists,
}) => {
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [addedItems, setAddedItems] = useState<ChecklistItemToAdd[]>(
        checklist?.checklist_items || [{ title: "", finished: false }]
    );
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<CreateChecklistFormData>({
        mode: "onChange",
        defaultValues: {
            checklistTitle: checklist?.title,
            checklistDescription: checklist?.description,
        },
    });
    const axiosInstance = useAxios();
    const { auth } = useAuth();

    // Function that handles the toggling of finished checkbox
    const handleChecklistToggle = (index: number) => {
        setAddedItems(
            addedItems.map((item, i) =>
                i === index ? { ...item, finished: !item.finished } : item
            )
        );
    };

    const handleEditItemStatus = (index: number) => {
        const updatedChecklist = {
            checklist_items: addedItems.map((item, i) =>
                i === index ? { ...item, finished: !item.finished } : item
            ),
        };

        axiosInstance
            .patch(`checklists/${checklist?.id}/`, updatedChecklist)
            .then((response) => {
                console.log(response.data);
                fetchChecklists();
            })
            .catch((error) => {
                console.error(
                    "Error occured while updating singular checklist item's status:",
                    error.response
                );
            });
    };

    const handleChecklistChange = (newTitle: string, index: number) => {
        setAddedItems(
            addedItems.map((item, i) =>
                i === index ? { ...item, title: newTitle } : item
            )
        );
    };

    const addChecklistItem = () => {
        setAddedItems((prevItems) => [
            ...prevItems,
            { title: "", finished: false },
        ]);
    };

    const deleteChecklist = () => {
        axiosInstance
            .delete(`/checklists/${checklist?.id}/`)
            .then(() => {
                fetchChecklists();
            })
            .catch((error) => {
                console.error(
                    "Error occured while deleting a checklist:",
                    error.response
                );
            });
    };

    const handleCreateEditChecklist: SubmitHandler<CreateChecklistFormData> = (
        data
    ) => {
        const newChecklist = {
            title: data.checklistTitle,
            description: data.checklistDescription,
            checklist_items: addedItems,
            author: auth.userId,
        };

        if (!checklist) {
            axiosInstance
                .post("/checklists/", newChecklist)
                .then(() => {
                    reset();
                    setAddedItems([{ title: "", finished: false }]);
                    fetchChecklists();
                })
                .catch((error) => {
                    console.error(
                        "Error occured while creating a checklist:",
                        error.response
                    );
                });
        } else {
            axiosInstance
                .patch(`/checklists/${checklist.id}/`, newChecklist)
                .then(() => {
                    fetchChecklists();
                    setEditOpen(false);
                })
                .catch((error) => {
                    console.error(
                        "Error occured while editing a checklist:",
                        error.response
                    );
                });
        }
    };

    return (
        <Card className="checklist-card">
            {editOpen || checklist === undefined ? (
                <Card.Body>
                    <Form onSubmit={handleSubmit(handleCreateEditChecklist)}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Add title"
                                {...register("checklistTitle", {
                                    required: "Please choose a title.",
                                })}
                            />
                            {errors.checklistTitle && (
                                <p className="error-message">
                                    {errors.checklistTitle.message}
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Add description"
                                {...register("checklistDescription", {
                                    required: false,
                                })}
                            />
                            {errors.checklistDescription && (
                                <p className="error-message">
                                    {errors.checklistDescription.message}
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            {addedItems.map((item, index) => {
                                return (
                                    <div className="checkbox-row" key={index}>
                                        <Form.Check
                                            checked={item.finished}
                                            onChange={() =>
                                                handleChecklistToggle(index)
                                            }
                                        />
                                        <Form.Control
                                            type="text"
                                            value={item.title}
                                            onChange={(e) =>
                                                handleChecklistChange(
                                                    e.target.value,
                                                    index
                                                )
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </Form.Group>
                        <Button type="button" onClick={addChecklistItem}>
                            +
                        </Button>
                        {checklist && (
                            <Button
                                type="button"
                                onClick={() => setEditOpen(false)}
                            >
                                Cancel
                            </Button>
                        )}

                        <Button type="submit">Save</Button>
                    </Form>
                </Card.Body>
            ) : (
                checklist && (
                    <Card.Body>
                        <Card.Title>{checklist.title}</Card.Title>
                        {checklist.checklist_items.length > 0 ? (
                            checklist.checklist_items.map((item, index) => {
                                return (
                                    <Form key={index}>
                                        <Form.Check
                                            label={item.title}
                                            checked={item.finished}
                                            onChange={() => {
                                                handleChecklistToggle(index);
                                                handleEditItemStatus(index);
                                            }}
                                        />
                                    </Form>
                                );
                            })
                        ) : (
                            <p>No items yet.</p>
                        )}
                        <Button type="button" onClick={() => setEditOpen(true)}>
                            Edit
                        </Button>
                        <Button type="button" onClick={deleteChecklist}>
                            Delete
                        </Button>
                    </Card.Body>
                )
            )}
        </Card>
    );
};

export default Checklist;

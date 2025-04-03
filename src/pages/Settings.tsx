import { Button, Card, Form, Modal } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type EditUserFormData = {
    username: string;
    email: string;
};

const Settings = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<EditUserFormData>({ mode: "onChange" });

    const axiosInstance = useAxios();
    const { auth, setAuth, loading, setLoading } = useAuth();
    const [editUserMessage, setEditUserMessage] = useState({
        error: false,
        message: "",
    });
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (loading) {
            return;
        }

        axiosInstance
            .get(`/users/${auth.userId}/`)
            .then((response) => {
                setValue("username", response.data.username);
                setValue("email", response.data.email);
            })
            .catch((error) => {
                console.error(
                    "Error occurred while fetching user:",
                    error.response
                );
            });
    }, [loading]);

    const handleEditUser: SubmitHandler<EditUserFormData> = (data) => {
        const editedUser = {
            email: data.email,
            username: data.username,
        };

        axiosInstance
            .patch(`/users/${auth.userId}/`, editedUser)
            .then(() => {
                setEditUserMessage({
                    error: false,
                    message: "Your changes have been saved successfully!",
                });

                setTimeout(() => {
                    setEditUserMessage({
                        error: false,
                        message: "",
                    });
                }, 3000);
            })
            .catch((error) => {
                const usernameError = error.response.data.username;
                const emailError = error.response.data.email;

                if (
                    usernameError?.includes(
                        "A user with that username already exists."
                    )
                ) {
                    setEditUserMessage({
                        message: "A user with that username already exists.",
                        error: true,
                    });
                } else if (
                    emailError?.includes(
                        "user with this email address already exists."
                    )
                ) {
                    setEditUserMessage({
                        message: "A user with that email already exists.",
                        error: true,
                    });
                } else {
                    setEditUserMessage({
                        message: "Editing account failed. Try again.",
                        error: true,
                    });
                }

                setTimeout(() => {
                    setEditUserMessage({ message: "", error: false });
                }, 3000);

                console.error(
                    "Error occurred while updating user:",
                    error.response
                );
            });
    };

    const handleDeleteUser = () => {
        axiosInstance
            .post(`/users/logout/`, {})
            .then(() => {
                setLoading(true);
                axiosInstance
                    .delete(`/users/${auth.userId}/`)
                    .catch((error) => {
                        console.error(error.response);
                    });
            })
            .then(() => {
                setAuth({
                    userId: null,
                    accessToken: null,
                    isAuthenticated: false,
                });
                setDeleteModalOpen(false);
                navigate("/login");
            })
            .catch((error) => {
                console.error(error.response);
            });
    };

    return (
        <div className="spaced-vertical-flex">
            <h1>Settings</h1>
            <Card>
                <Card.Body>
                    <Card.Title>Edit Account</Card.Title>
                    <Form onSubmit={handleSubmit(handleEditUser)}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="username">Username</Form.Label>
                            <Form.Control
                                type="text"
                                id="username"
                                style={
                                    errors.username
                                        ? {
                                              border: "1px solid var(--error-color)",
                                          }
                                        : undefined
                                }
                                {...register("username", {
                                    required: "Please, type your username.",
                                })}
                            />
                            {errors.username && (
                                <p className="error-message">
                                    {errors.username.message}
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control
                                type="text"
                                id="email"
                                style={
                                    errors.email
                                        ? {
                                              border: "1px solid var(--error-color)",
                                          }
                                        : undefined
                                }
                                {...register("email", {
                                    required: "Please, type your email.",
                                    pattern: {
                                        value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
                                        message: "Please, enter a valid email.",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="error-message">
                                    {errors.email.message}
                                </p>
                            )}
                        </Form.Group>

                        {editUserMessage.message.length > 0 ? (
                            <p
                                className={
                                    editUserMessage.error
                                        ? "error-message"
                                        : "success-message"
                                }
                            >
                                {editUserMessage.message}
                            </p>
                        ) : null}

                        <Card.Footer className="buttons card-footer">
                            <Button type="submit" className="green-button">
                                Save
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>Delete Account</Card.Title>
                    <Card.Text>
                        Leaving? You are welcome to create a new account later
                        when you feel like it!
                    </Card.Text>
                    <Card.Footer className="buttons card-footer">
                        <Button
                            type="button"
                            onClick={() => setDeleteModalOpen(true)}
                            className="pink-button"
                        >
                            Delete
                        </Button>
                    </Card.Footer>
                </Card.Body>
            </Card>

            <Modal
                show={deleteModalOpen}
                onHide={() => {
                    setDeleteModalOpen(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete account?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete your account?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        onClick={() => setDeleteModalOpen(false)}
                        className="pink-button"
                    >
                        No
                    </Button>
                    <Button
                        type="button"
                        onClick={() => handleDeleteUser()}
                        className="green-button"
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Settings;

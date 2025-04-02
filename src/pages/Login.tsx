import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Button, Form } from "react-bootstrap";

interface LoginFormData {
    username: string;
    password: string;
}

const Login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginFormData>({
        mode: "onChange",
    });
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const { setAuth, setLoading } = useAuth();

    const handleLogin: SubmitHandler<LoginFormData> = (data) => {
        const userToLogin = {
            username: data.username,
            password: data.password,
        };

        axios
            .post(`${baseUrl}/users/login/`, userToLogin, {
                withCredentials: true,
            })
            .then((response) => {
                try {
                    setAuth({
                        userId: response.data.user_id,
                        accessToken: response.data.access_token,
                        isAuthenticated: true,
                    });
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            })
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error(error.response);

                const accountError = error.response?.data?.detail;

                if (
                    accountError &&
                    accountError.includes("Invalid username or password")
                ) {
                    setMessage("Invalid username or password.");
                }
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit(handleLogin)}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                        type="text"
                        id="username"
                        style={
                            errors.username
                                ? { border: "1px solid var(--error-color)" }
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
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        style={
                            errors.password
                                ? { border: "1px solid var(--error-color)" }
                                : undefined
                        }
                        {...register("password", {
                            required: "Please, type your password.",
                        })}
                    />
                    {errors.password && (
                        <p className="error-message">
                            {errors.password.message}
                        </p>
                    )}
                </Form.Group>

                {message.length > 0 ? (
                    <p className="error-message">{message}</p>
                ) : null}

                <div className="buttons">
                    <Button
                        type="button"
                        onClick={() => navigate("/sign-up")}
                        className="pink-button"
                    >
                        Sign Up
                    </Button>
                    <Button type="submit" className="green-button">
                        Login
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Login;

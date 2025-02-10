import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

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
                console.log(response.data);

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
                // navigate("/")
            })
            .catch((error) => {
                console.error(error.response);

                const accountError = error.response?.data?.detail;

                if (
                    accountError &&
                    accountError.includes(
                        "No active account found with the given credentials"
                    )
                ) {
                    setMessage(
                        "No active account found with the given credentials."
                    );
                }
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <form className="form-flex" onSubmit={handleSubmit(handleLogin)}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
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
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
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
                </div>

                {message.length > 0 ? (
                    <p className="error-message">{message}</p>
                ) : null}

                <div className="buttons">
                    <button type="button" onClick={() => navigate("/sign-up")}>
                        Sign Up
                    </button>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;

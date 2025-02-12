import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { useState } from "react";

interface SignUpFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm<SignUpFormData>({
        mode: "onChange",
    });
    const navigate = useNavigate();
    const [message, setMessage] = useState({ text: "", error: false });

    const handleSignUp: SubmitHandler<SignUpFormData> = (data) => {
        const userToCreate = {
            username: data.username,
            email: data.email,
            password: data.password,
        };

        axios
            .post(`${baseUrl}/users/register/`, userToCreate)
            .then(() => {
                setMessage({
                    text: "User created successfully. Redirecting to login page in 3 seconds.",
                    error: false,
                });
                setTimeout(() => {
                    navigate("/login");
                    setMessage({ text: "", error: false });
                }, 3000);
            })
            .catch((error) => {
                console.error(error.response);
                const usernameError = error.response.data.username;

                if (
                    usernameError.includes(
                        "A user with that username already exists."
                    )
                ) {
                    setMessage({
                        text: "A user with that username already exists.",
                        error: true,
                    });
                } else {
                    setMessage({
                        text: "Signup failed. Try again.",
                        error: true,
                    });
                }
            });
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form className="form-flex" onSubmit={handleSubmit(handleSignUp)}>
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
                            required: "Please, choose a username.",
                        })}
                    />
                    {errors.username && (
                        <p className="error-message">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        style={
                            errors.email
                                ? { border: "1px solid var(--error-color)" }
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
                        <p className="error-message">{errors.email.message}</p>
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
                            required: "Please, choose a password.",
                        })}
                    />
                    {errors.password && (
                        <p className="error-message">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        style={
                            errors.confirmPassword
                                ? { border: "1px solid var(--error-color)" }
                                : undefined
                        }
                        {...register("confirmPassword", {
                            required: "Please, confirm your password.",
                            validate: {
                                match: (v) => {
                                    const { password } = getValues();
                                    return (
                                        v === password ||
                                        "The passwords don't match. Check again."
                                    );
                                },
                            },
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="error-message">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {message.text.length > 0 ? (
                    <p
                        className={
                            message.error ? "error-message" : "success-message"
                        }
                    >
                        {message.text}
                    </p>
                ) : null}

                <div className="buttons">
                    <button type="button" onClick={() => navigate("/login")}>
                        Cancel
                    </button>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;

import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

    const handleSignUp: SubmitHandler<SignUpFormData> = (data) => {
        console.log(data);
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

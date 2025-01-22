import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

    const handleLogin: SubmitHandler<LoginFormData> = (data) => {
        console.log(data);
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
                                ? { border: "1px solid red" }
                                : undefined
                        }
                        {...register("username", {
                            required: "Please, type your username.",
                        })}
                    />
                    {errors.username && (
                        <p className="errorMessage">
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
                                ? { border: "1px solid red" }
                                : undefined
                        }
                        {...register("password", {
                            required: "Please, type your password.",
                        })}
                    />
                    {errors.password && (
                        <p className="errorMessage">
                            {errors.password.message}
                        </p>
                    )}
                </div>

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

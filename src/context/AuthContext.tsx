import React, { createContext, ReactNode, useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Auth = {
    userId: number | null;
    accessToken: string | null;
    isAuthenticated: boolean;
};

type AuthContextType = {
    auth: Auth;
    setAuth: React.Dispatch<React.SetStateAction<Auth>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<Auth>({
        userId: null,
        accessToken: null,
        isAuthenticated: false,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .post(
                `${baseUrl}/users/token/refresh/`,
                {},
                { withCredentials: true }
            )
            .then((response) => {
                try {
                    setAuth({
                        userId: response.data.user_id,
                        accessToken: response.data.access,
                        isAuthenticated: true,
                    });
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error(
                    "An error occured while refreshing logged in user: ",
                    error.response
                );

                if (
                    error.response?.status === 401 ||
                    error.response?.status === 400
                ) {
                    // Token is missing or invalid
                    setAuth({
                        userId: null,
                        accessToken: null,
                        isAuthenticated: false,
                    });
                }

                navigate("/login");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        console.log(auth);
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

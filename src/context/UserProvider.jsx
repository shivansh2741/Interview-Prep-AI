Appimport { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";


const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            }
            catch (error) {
                setUser(null);
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    const updateUser = (userData) => {
        setUser((prev) => {
            return {
                ...prev,
                ...userData
            }
        })
    };

    const clearUser = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider
            value={{ user, loading, updateUser, clearUser }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
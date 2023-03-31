import { createContext, useContext, useEffect, useState } from "react";
import { makeRequest } from "../axiosInstance";
import { UserContext } from "./UserContext";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const { getUser } = useContext(UserContext);

	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);

	const [loading, setLoading] = useState(false);

	const login = async (inputs) => {
		setLoading(true);
		try {
			const res = await makeRequest.post(
				"http://localhost:5000/api/auth/login",
				inputs,
				{
					withCredentials: true,
				}
			);
			if (res.status === 200) {
				setCurrentUser(res.data);
				setLoading(false);
				await getUser();
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const register = async (inputs) => {
		setLoading(true);
		try {
			const res = await makeRequest.post(
				"http://localhost:5000/api/auth",
				inputs,
				{
					withCredentials: true,
				}
			);
			if (res.status === 200) {
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const logout = async () => {
		try {
			const res = await makeRequest.post("/auth/logout");
			if (res.status === 200) {
				localStorage.removeItem("user");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser]);

	return (
		<AuthContext.Provider
			value={{ currentUser, login, register, logout, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

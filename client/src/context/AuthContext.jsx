import { createContext, useContext, useEffect, useState } from "react";
import { makeRequest } from "../axiosInstance";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

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
			const res = await makeRequest.post("/auth/login", inputs);
			if (res.status === 200) {
				setCurrentUser(res.data.user);
				setLoading(false);
				await getUser();
				localStorage.setItem("token", res.data.token);
				toast.success("User login success!", { theme: "colored" });
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			toast.error("Error occured!", { theme: "colored" });
		}
	};

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser]);

	const register = async (inputs) => {
		setLoading(true);
		try {
			const res = await makeRequest.post(
				"http://localhost:5000/api/auth",
				inputs
			);
			if (res.status === 200) {
				setLoading(false);
				toast.success(res.data, { theme: "colored" });
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			toast.error("Error occured!", { theme: "colored" });
		}
	};

	return (
		<AuthContext.Provider value={{ currentUser, login, register, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

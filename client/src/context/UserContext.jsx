import { createContext, useState } from "react";
import { makeRequest } from "../axiosInstance";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	const getUser = async () => {
		try {
			const res = await makeRequest.get("/users");

			if (res.status === 200) {
				setUser(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateUser = async (inputs) => {
		setLoading(true);

		try {
			const res = await makeRequest.put("/users/me", inputs);

			if (res.status === 200) {
				await getUser();
				setLoading(false);
				toast.success(res.data, { theme: "colored" });
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<UserContext.Provider value={{ getUser, user, updateUser, loading }}>
			{children}
		</UserContext.Provider>
	);
};

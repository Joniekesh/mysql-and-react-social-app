import axios from "axios";

export const makeRequest = axios.create({
	baseURL: "http://localhost:5000/api",
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	},
});

// export const makeRequest = axios.create({
// 	baseURL: "https://mysql-social-app.onrender.com/api",
// 	headers: {
// 		Authorization: `Bearer ${localStorage.getItem("token")}`,
// 	},
// });

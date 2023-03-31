import axios from "axios";

// export const makeRequest = axios.create({
// 	baseURL: "http://localhost:5000/api",
// 	withCredentials: true,
// });

export const makeRequest = axios.create({
	baseURL: "https://mysql-social-app.onrender.com/api",
	withCredentials: true,
});

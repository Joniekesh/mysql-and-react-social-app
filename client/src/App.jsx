import "./global.scss";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { io } from "socket.io-client";

const queryClient = new QueryClient();

// socket io
// const ENDPOINT = "https://mysql-social-app.onrender.com";
const ENDPOINT = "mysql-react-app-api-production.up.railway.app";

const App = () => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);

	const { darkMode } = useContext(DarkModeContext);
	const { currentUser } = useContext(AuthContext);
	const { getUser, user } = useContext(UserContext);

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		setSocket(io(ENDPOINT));
		socket?.emit("addUser", user.fullname);
	}, [user]);

	useEffect(() => {
		socket?.on("getOnlineUsers", (users) => {
			setOnlineUsers(users);
		});
	}, [user]);

	const PrivateRoute = ({ children }) => {
		return currentUser ? children : <Navigate to="/login" />;
	};

	const Layout = () => {
		return (
			<QueryClientProvider client={queryClient}>
				<div>
					<ToastContainer />
				</div>
				<div className={`theme-${darkMode ? "dark" : "light"}`}>
					<Navbar socket={socket} />
					<div style={{ display: "flex" }}>
						<LeftBar />
						<div style={{ flex: 6 }}>
							<Outlet />
						</div>
						<RightBar />
					</div>
				</div>
			</QueryClientProvider>
		);
	};

	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<PrivateRoute>
					<Layout />
				</PrivateRoute>
			),
			children: [
				{
					path: "/",
					element: <Home socket={socket} />,
				},
				{
					path: "/profile/:id",
					element: <Profile />,
				},
			],
		},
		{
			path: "/register",
			element: <Register />,
		},
		{
			path: "/login",
			element: <Login />,
		},
	]);

	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
};

export default App;

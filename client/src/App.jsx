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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
	const { darkMode } = useContext(DarkModeContext);
	const { currentUser } = useContext(AuthContext);
	const { getUser } = useContext(UserContext);

	useEffect(() => {
		const fetchUser = async () => {
			await getUser();
		};
		fetchUser();
	}, []);

	const PrivateRoute = ({ children }) => {
		return currentUser ? children : <Navigate to="/login" />;
	};

	const Layout = () => {
		return (
			<QueryClientProvider client={queryClient}>
				<div className={`theme-${darkMode ? "dark" : "light"}`}>
					<Navbar />
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
					element: <Home />,
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

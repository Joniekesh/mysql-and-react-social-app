import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DarkModeContextProvider } from "./context/DarkModeContext";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<DarkModeContextProvider>
			<UserContextProvider>
				<AuthContextProvider>
					<App />
				</AuthContextProvider>
			</UserContextProvider>
		</DarkModeContextProvider>
	</React.StrictMode>
);

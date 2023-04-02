import "./navbar.scss";
import { FcHome } from "react-icons/fc";
import { BsMoon, BsSun, BsBell } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { UserContext } from "../../context/UserContext";

const Navbar = ({ socket }) => {
	const [notifications, setNotifications] = useState([]);
	const [open, setOpen] = useState(false);

	const { toggle, darkMode } = useContext(DarkModeContext);
	const { user } = useContext(UserContext);

	const id = user?.id.toString();

	const navigate = useNavigate();

	const handleLogout = async () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");

		// navigate("/login");
		window.location.replace("/login");
	};

	useEffect(() => {
		socket?.on("getNotifications", (data) => {
			setNotifications((prev) => [...prev, data]);
			// console.log(data.sender);
		});
	}, [socket, notifications]);

	// console.log(typeof notifications);
	console.log(notifications);

	const displayNotifications = ({ sender, type }) => {
		let action;

		if (type === 1) {
			action = "liked";
		} else if (type === 2) {
			action = "commented on";
		}
		return <span>{`${sender} ${action} your post.`}</span>;
	};

	return (
		<div className="navbar">
			<div className="left">
				<Link to="/" className="link">
					<h2>jonieSocial</h2>
				</Link>
				<Link to="/" className="link">
					<FcHome style={{ fontSize: "22px" }} />
				</Link>
				{darkMode ? (
					<BsSun
						style={{ fontSize: "22px", cursor: "pointer" }}
						onClick={() => toggle()}
					/>
				) : (
					<BsMoon
						style={{ fontSize: "22px", cursor: "pointer" }}
						onClick={() => toggle()}
					/>
				)}

				<div className="search">
					<BiSearchAlt2 style={{ color: "gray" }} />
					<input type="text" placeholder="Search" />
				</div>
			</div>
			<div className="right">
				<AiOutlineMail
					style={{ fontSize: "22px", cursor: "pointer" }}
					className="fname"
				/>
				<div className="notification">
					<BsBell style={{ fontSize: "22px", cursor: "pointer" }} />
					<span className="count">15</span>
				</div>
				<Link
					to={`/profile/${id}
				`}
					className="link"
				>
					<img src={"/upload/" + user?.profilepic} alt="" />
				</Link>
				<Link
					to={`/profile/${id}
				`}
					className="link fname"
				>
					<span>{user?.fullname}</span>
				</Link>
				<button onClick={handleLogout}>Logout</button>
			</div>
			{open && (
				<div className="notifications">
					{notifications.map((n) => displayNotifications(n))}
				</div>
			)}
		</div>
	);
};

export default Navbar;

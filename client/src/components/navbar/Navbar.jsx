import "./navbar.scss";
import { FcHome } from "react-icons/fc";
import { BsMoon, BsSun, BsBell } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
	const { toggle, darkMode } = useContext(DarkModeContext);
	const { logout } = useContext(AuthContext);
	const { user } = useContext(UserContext);

	const id = user?.id.toString();

	const handleLogout = async () => {
		await logout();
		window.location.replace("/login");
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
		</div>
	);
};

export default Navbar;

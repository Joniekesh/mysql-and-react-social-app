import "./leftBar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const LeftBar = () => {
	const { user } = useContext(UserContext);

	return (
		<div className="leftBar">
			<div className="container">
				<div className="top">
					<Link to="/profile/111" className="link">
						<div className="item">
							<span className="icon">
								<img
									src={"/upload/" + user?.profilepic}
									alt=""
									style={{
										border: "1px solid lightgray",
										height: "30px",
										width: "30px",
										borderRadius: "50%",
										objectFit: "cover",
									}}
								/>
							</span>
							<span className="text" style={{ fontWeight: "bold" }}>
								{user?.fullname}
							</span>
						</div>
					</Link>
					<div className="item">
						<span className="icon">
							<img src="/assets/1.png" alt="" />
						</span>
						<span className="text">Friends</span>
					</div>
					<div className="item">
						<span className="icon">
							<img src="/assets/2.png" alt="" />
						</span>
						<span className="text">Groups</span>
					</div>
					<div className="item">
						<span className="icon">
							<img src="/assets/3.png" alt="" />
						</span>
						<span className="text">Market Place</span>
					</div>
					<div className="item">
						<span className="icon">
							<img src="/assets/4.png" alt="" />
						</span>
						<span className="text">Watch</span>
					</div>
					<div className="item">
						<span className="icon">
							<img src="/assets/5.png" alt="" />
						</span>
						<span className="text">Memories</span>
					</div>
				</div>
				<hr />
				<div className="middle">
					<span className="title">Your Shortcuts</span>
					<div className="item">
						<span className="icon">
							<img src="/assets/6.png" alt="" />
						</span>
						<span className="text">Events</span>
					</div>
					<div className="item">
						<span className="icon">
							<img src="/assets/7.png" alt="" />
						</span>
						<span className="text">Gaming</span>
					</div>
					<div className="item">
						<span className="icon">
							<img src="/assets/8.png" alt="" />
						</span>
						<span className="text">Gallery</span>
					</div>
					<div className="item">
						<span className="icon">
							<img src="/assets/9.png" alt="" />
						</span>
						<span className="text">Videos</span>
					</div>
					<div className="item">
						<span className="icon">
							<img src="/assets/10.png" alt="" />
						</span>
						<span className="text">Messages</span>
					</div>
				</div>
				<hr />
				<div className="bottom">
					<span className="title">Others</span>
					<div className="item">
						<span className="icon">
							<img src="/assets/11.png" alt="" />
						</span>
						<span className="text">Fundraiser</span>
					</div>
					<div className="item">
						<span className="icon">
							<img src="/assets/12.png" alt="" />
						</span>
						<span className="text">Tutorials</span>
					</div>
					<div className="item">
						<span className="icon">
							<img src="/assets/13.png" alt="" />
						</span>
						<span className="text">Courses</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeftBar;

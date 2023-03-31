import "./stories.scss";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axiosInstance";

const Stories = ({ setOpen }) => {
	const { user } = useContext(UserContext);

	const { isLoading, error, data } = useQuery(["stories"], () =>
		makeRequest.get("/stories").then((res) => {
			return res.data;
		})
	);

	return (
		<div className="stories">
			<div className="story" onClick={() => setOpen(true)}>
				<img src="/assets/bg.jpeg" alt="" />
				<span className="icon">
					<AiOutlinePlusCircle />
				</span>
				<span className="username">{user?.fullname}</span>
			</div>
			<div className="list">
				{data?.map((story) => (
					<div className="listItem" key={story.id}>
						<img
							className="video"
							src={"/upload/" + story.image}
							alt=""
							// style={{ width: "100%", objectFit: "contain", height: "100%" }}
						/>
						<span>{story?.fullname}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Stories;

import "./home.scss";
import Stories from "../../components/stories/Stories";
import { useState } from "react";
import AddStory from "../../components/addStory/AddStory";
import Share from "../../components/share/Share";
import PostItem from "../../components/postItem/PostItem";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axiosInstance";
import Loader from "../../components/loader/Loader";

const Home = ({ socket }) => {
	const [open, setOpen] = useState(false);

	const { isLoading, error, data } = useQuery(["posts"], () =>
		makeRequest.get("/posts").then((res) => {
			return res.data;
		})
	);

	return (
		<div className="home">
			<Stories setOpen={setOpen} />
			{open && <AddStory setOpen={setOpen} />}
			<Share socket={socket} />
			<div className="posts">
				{isLoading && <Loader />}
				{error && <span>{error}</span>}
				{data?.length > 0 ? (
					data.map((post) => (
						<PostItem post={post} key={post.id} socket={socket} />
					))
				) : (
					<span className="noPosts">No post yet.</span>
				)}
			</div>
		</div>
	);
};

export default Home;

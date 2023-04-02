import "./share.scss";
import { BsFillImageFill } from "react-icons/bs";
import { FiVideo } from "react-icons/fi";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axiosInstance";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";

const Share = ({ socket }) => {
	const [description, setDescription] = useState("");
	const [file, setFile] = useState("");

	const { user } = useContext(UserContext);

	const upload = async () => {
		try {
			const formData = new FormData();
			formData.append("file", file);
			const res = await makeRequest.post("/upload", formData);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	};

	const queryClient = useQueryClient();

	const mutation = useMutation(
		(newPost) => {
			return makeRequest.post("/posts", newPost);
		},
		{
			onSuccess: () => {
				// Invalidate and refetch
				queryClient.invalidateQueries(["posts"]);
			},
		}
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		let imgUrl = "";
		if (file) imgUrl = await upload();

		mutation.mutate({ description, img: imgUrl });
		setDescription("");
		setFile("");

		toast.success("Post created.", { theme: "colored" });
	};

	return (
		<div className="share">
			<form onSubmit={handleSubmit}>
				<div className="top">
					<div className="topLeft">
						<img src={"/upload/" + user?.profilepic} alt="" />
						<input
							type="text"
							placeholder={`What's on your mind ${user?.fullname}?`}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					{file && (
						<div className="topRight">
							<img src={URL.createObjectURL(file)} alt="" />
						</div>
					)}
				</div>
				<div className="bottom">
					<div className="bottomLeft">
						<div className="formInput">
							<input
								type="file"
								id="imageId"
								style={{ display: "none" }}
								onChange={(e) => setFile(e.target.files[0])}
							/>
							<label htmlFor="imageId">
								<BsFillImageFill />
							</label>
							<span>Add Image</span>
						</div>
						<div className="formInput">
							<input type="file" id="videoId" style={{ display: "none" }} />
							<label htmlFor="videoId">
								<FiVideo />
							</label>
							<span>Add Video</span>
						</div>
					</div>
					<div className="bottomRight">
						<button type="submit">Share</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Share;

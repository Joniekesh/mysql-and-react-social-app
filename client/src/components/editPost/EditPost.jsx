import "./editPost.scss";
import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axiosInstance";

const EditPost = ({ setOpenEditPost, post }) => {
	const [description, setDescription] = useState(post.description);
	const [file, setFile] = useState();

	const queryClient = useQueryClient();

	const updateMutation = useMutation(
		(post) => {
			return makeRequest.put(`/posts/${post.id}`, post);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["posts"]);
			},
		}
	);

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		let imgUrl = "";
		if (file) imgUrl = await upload();

		updateMutation.mutate({
			id: post.id,
			description,
			img: imgUrl || post.img,
		});
		setOpenEditPost(false);
	};

	return (
		<div className="editPost">
			<div className="container">
				<h2>Edit Post</h2>
				<span className="cancel" onClick={() => setOpenEditPost(false)}>
					<ImCancelCircle />
				</span>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						defaultValue={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<input type="file" onChange={(e) => setFile(e.target.files[0])} />
					{file && <img src={URL.createObjectURL(file)} alt="" />}
					<button type="submit">Update</button>
				</form>
			</div>
		</div>
	);
};

export default EditPost;

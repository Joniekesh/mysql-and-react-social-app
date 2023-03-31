import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { makeRequest } from "../../axiosInstance";
import "./addStory.scss";

const AddStory = ({ setOpen }) => {
	const [file, setFile] = useState(null);

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
		(newStory) => {
			return makeRequest.post("/stories", newStory);
		},
		{
			onSuccess: () => {
				// Invalidate and refetch
				queryClient.invalidateQueries(["stories"]);
			},
		}
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		let imgUrl = "";
		if (file) imgUrl = await upload();

		mutation.mutate({ video: imgUrl });
		setOpen(false);
	};

	return (
		<div className="addStory">
			<div className="addStorycontainer">
				<form onSubmit={handleSubmit}>
					<h2>Add story and share to the public.</h2>
					<div className="formInput">
						<input type="file" onChange={(e) => setFile(e.target.files[0])} />
						{file && <img src={URL.createObjectURL(file)} alt="" />}
					</div>
					<button type="submit">Share</button>
				</form>
				<button className="cancel" onClick={() => setOpen(false)}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default AddStory;

import "./comments.scss";
import CommentItem from "../commentItem/CommentItem";
import Loader from "../loader/Loader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axiosInstance";
import { useState } from "react";

const Comments = ({ postId }) => {
	const [text, setText] = useState("");

	const { isLoading, error, data } = useQuery(["comments"], () =>
		makeRequest.get("/comments/" + postId).then((res) => {
			return res.data;
		})
	);

	const queryClient = useQueryClient();

	const mutation = useMutation(
		(newComment) => {
			return makeRequest.post("/comments", newComment);
		},
		{
			onSuccess: () => {
				// Invalidate and refetch
				queryClient.invalidateQueries(["comments"]);
			},
		}
	);

	const handleSubmit = (e) => {
		e.preventDefault();

		mutation.mutate({ text, postId });
		setText("");
	};

	return (
		<div className="comments">
			<form onSubmit={handleSubmit}>
				<div className="formInput">
					<img src="/assets/profilepic.png" alt="" />
					<input
						type="text"
						placeholder="Add Comment"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<button className="btn" type="submit">
					Send
				</button>
			</form>
			<h3>Comments</h3>
			{isLoading && <Loader />}
			{error && <span>{error}</span>}
			{data?.length > 0 ? (
				<div className="commentList">
					{data.map((comment) => (
						<CommentItem comment={comment} key={comment.id} />
					))}
				</div>
			) : (
				<span>No comments yet.</span>
			)}
		</div>
	);
};

export default Comments;

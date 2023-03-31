import "./commentItem.scss";
import { FaEllipsisV } from "react-icons/fa";
import { useContext, useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";
import { makeRequest } from "../../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CommentItem = ({ comment }) => {
	const [open, setOpen] = useState(false);

	const { currentUser } = useContext(AuthContext);

	const queryClient = useQueryClient();

	const deleteCommentMutation = useMutation(
		(commentId) => {
			return makeRequest.delete(`/comments/${commentId}`);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["comments"]);
			},
		}
	);

	const handleDelete = () => {
		deleteCommentMutation.mutate(comment.id);
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<div className="commentItem">
			<div className="commentTop">
				<div className="left">
					<img src="/assets/profilepic.png" alt="" />
					<div className="userDetails">
						<span className="username">{comment?.fullname}</span>
						<span className="time">{format(comment?.created_at)}</span>
					</div>
				</div>
				{currentUser.id === comment.userId && (
					<div className="right" onClick={handleOpen}>
						<FaEllipsisV style={{ cursor: "pointer" }} />
					</div>
				)}
				{open && (
					<div className="editDelete">
						<div className="edit" onClick={handleOpen}>
							<FiEdit3 />
							<span>Edit</span>
						</div>
						<div className="delete" onClick={handleDelete}>
							<FiTrash />
							<span>Delete</span>
						</div>
					</div>
				)}
			</div>
			<hr />
			<div className="commentBottom">
				<p>{comment?.text}</p>
			</div>
		</div>
	);
};

export default CommentItem;

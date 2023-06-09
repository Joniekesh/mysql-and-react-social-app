import "./postItem.scss";
import { BiComment } from "react-icons/bi";
import { BsShare } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import EditPost from "../editPost/EditPost";
import Comments from "../comments/Comments";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { makeRequest } from "../../axiosInstance";
import { format } from "timeago.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const PostItem = ({ post, socket }) => {
	const [open, setOpen] = useState(false);
	const [openEditPost, setOpenEditPost] = useState(false);
	const [showComments, setShowComments] = useState(false);

	const handleOpen = () => {
		setOpenEditPost(true);
		setOpen(false);
	};

	const { currentUser } = useContext(AuthContext);
	const { user } = useContext(UserContext);

	const queryClient = useQueryClient();

	const { isLoading, error, data } = useQuery(["likes", post?.id], () =>
		makeRequest.get("/likes/" + post?.id).then((res) => {
			return res.data;
		})
	);

	const isLiked = data?.includes(currentUser?.id);

	const likeUnlikeMutation = useMutation(
		(postId) => {
			return makeRequest.post(`/likes/${postId}`, { postId });
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["likes"]);
			},
		}
	);

	const handleLike = (type) => {
		likeUnlikeMutation.mutate(post.id);
		toast.success(isLiked ? "Post disliked" : "Post liked", {
			theme: "colored",
		});

		socket?.emit("sendNotification", {
			sender: user.fullname,
			receiver: post.fullname,
			type,
		});
	};

	const deleteMutation = useMutation(
		(postId) => {
			return makeRequest.delete(`/posts/${postId}`);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["posts"]);
			},
		}
	);

	const handleDelete = () => {
		deleteMutation.mutate(post.id);
	};

	return (
		<div className="postItem">
			<div className="top">
				<Link to={`/profile/${post?.userId}`} className="link">
					<div className="topLeft">
						<img src={"/upload/" + post?.profilepic} alt="" />
						<div className="userInfo">
							<span className="username">{post?.fullname}</span>
							<span className="time">{format(post?.created_at)}</span>
						</div>
					</div>
				</Link>
				{currentUser?.id === post?.userId && (
					<div className="topRight">
						<FaEllipsisV
							style={{ cursor: "pointer" }}
							onClick={() => setOpen(!open)}
						/>
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
			<div className="middle">
				<p>{post?.description}</p>
				<img src={"/upload/" + post?.img} alt="" />
			</div>
			<div className="bottom">
				<div className="reactionItem">
					<AiOutlineHeart
						style={{ cursor: "pointer", color: isLiked && "red" }}
						onClick={() => handleLike(1)}
					/>
					<span>
						{data?.length} {data?.length > 1 ? "Likes" : "Like"}
					</span>
				</div>
				<div
					style={{ cursor: "pointer" }}
					className="reactionItem"
					onClick={() => setShowComments(!showComments)}
				>
					<BiComment />
					<span className="commentText">Comments</span>
				</div>
				<div className="reactionItem">
					<BsShare />
					<span>Share</span>
				</div>
			</div>
			{showComments && (
				<Comments postId={post.id} fullname={post.fullname} socket={socket} />
			)}
			{openEditPost && (
				<EditPost setOpenEditPost={setOpenEditPost} post={post} />
			)}
		</div>
	);
};

export default PostItem;

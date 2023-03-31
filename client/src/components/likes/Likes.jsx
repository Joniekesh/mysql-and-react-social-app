import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { makeRequest } from "../../axiosInstance";
import { AuthContext } from "../../context/AuthContext";

const Likes = ({ post }) => {
	const { currentUser } = useContext(AuthContext);

	const queryClient = useQueryClient();

	const { isLoading, error, data } = useQuery(["likes", post.id], () =>
		makeRequest.get("/likes/" + post.id).then((res) => {
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

	const handleLike = () => {
		likeUnlikeMutation.mutate(post.id);
	};

	return (
		<>
			<AiOutlineHeart
				style={{ cursor: "pointer", color: isLiked && "red" }}
				onClick={handleLike}
			/>
			<span>
				{data?.length} {data?.length > 1 ? "Likes" : "Like"}
			</span>
		</>
	);
};

export default Likes;

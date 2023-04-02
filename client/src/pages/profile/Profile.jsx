import "./profile.scss";
import { FaEllipsisV } from "react-icons/fa";
import PostItem from "../../components/postItem/PostItem";
import { useContext, useEffect, useState } from "react";
import EditProfile from "../../components/editProfile/EditProfile";
import { AuthContext } from "../../context/AuthContext";
import { GoLocation } from "react-icons/go";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../components/loader/Loader";

const Profile = () => {
	const [user, setUser] = useState(null);
	const [isEdit, setIsEdit] = useState(false);

	console.log(user);

	const { id } = useParams();

	const userId = parseInt(id);

	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await makeRequest.get(`/users/${userId}`);
				if (res.status === 200) {
					setUser(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchUser();
	}, [userId]);

	const queryClient = useQueryClient();

	const { isLoading, error, data } = useQuery(["relationships"], () =>
		makeRequest.get("/relationships/" + userId).then((res) => {
			return res.data;
		})
	);

	const {
		isLoading: postLoading,
		error: postError,
		data: posts,
	} = useQuery(["tlPosts"], () =>
		makeRequest.get("/posts/timeline").then((res) => {
			return res.data;
		})
	);

	const isFollowed = data?.includes(currentUser?.id);

	const followUnfollowMutation = useMutation(
		(userId) => {
			return makeRequest.post(`/relationships/${userId}`, { userId });
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["relationships"]);
			},
		}
	);

	const handleFollow = () => {
		followUnfollowMutation.mutate(userId);
	};

	return (
		<div className="profile">
			<div className="profileTop">
				<img src={"/upload/" + user?.coverpic} alt="" />
				<div className="profileMiddle">
					<div className="mTop">
						<img src={"/upload/" + user?.profilepic} alt="" />
					</div>
				</div>
			</div>

			<div className="profileBottom">
				<h3>
					{user?.fullname} ( {user?.username} )
				</h3>
				<span style={{ textAlign: "center", fontWeight: "300" }}>
					{user?.bio}
				</span>
				<div className="details">
					<div className="item">
						<span>
							<AiOutlineMail /> :
						</span>
						<span>{user?.email}</span>
					</div>
					<div className="item">
						<span>
							<GoLocation /> :
						</span>
						<span>{user?.address}</span>
					</div>
					<div className="item">
						<span>
							<BsTelephone /> :
						</span>
						<span>{user?.phone}</span>
					</div>

					<div className="item">
						<span>City :</span>
						<span>{user?.city}</span>
					</div>
					<div className="item">
						<span>Country :</span>
						<span>{user?.country}</span>
					</div>
				</div>
				<div className="followcount">
					<div className="fcItem">
						<span className="key">{data?.length}</span>
						<span className="value">
							{data?.length > 1 ? "Followers" : "Follower"}
						</span>
					</div>
					{currentUser.id !== userId && (
						<button onClick={handleFollow}>
							{isFollowed ? "Unfollow" : "Follow"}
						</button>
					)}
					<div className="fcItem">
						<span className="key">5</span>
						<span className="value">Followings</span>
					</div>
				</div>
				{currentUser.id === userId && (
					<span className="icon" onClick={() => setIsEdit(true)}>
						<FaEllipsisV />
					</span>
				)}
			</div>
			<div className="posts">
				{postLoading && <Loader />}
				{postError && <span>{error}</span>}
				{posts?.map((post) => (
					<PostItem post={post} key={post.id} />
				))}
			</div>
			{isEdit && <EditProfile setIsEdit={setIsEdit} user={user} />}
		</div>
	);
};

export default Profile;

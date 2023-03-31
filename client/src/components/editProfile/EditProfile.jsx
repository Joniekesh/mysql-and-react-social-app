import "./editProfile.scss";
import { ImCancelCircle } from "react-icons/im";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Loader from "../loader/Loader";
import { makeRequest } from "../../axiosInstance";

const EditProfile = ({ setIsEdit, user }) => {
	const [profilepic, setProfilePic] = useState("");
	const [coverpic, setCoverPic] = useState("");

	const { updateUser, loading } = useContext(UserContext);

	const [inputs, setInputs] = useState({
		username: user?.username,
		fullname: user?.fullname,
		email: user?.email,
		password: user?.password,
		address: user?.address,
		city: user?.city,
		country: user?.country,
		bio: user?.bio,
		phone: user?.phone,
		password: "",
	});

	const {
		username,
		fullname,
		email,
		password,
		address,
		city,
		country,
		bio,
		phone,
	} = inputs;

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const upload = async () => {
		try {
			const formData = new FormData();
			if (coverpic) {
				formData.append("file", coverpic);
				const res = await makeRequest.post("/upload", formData);
				return res.data;
			} else if (profilepic) {
				formData.append("file", profilepic);
				const res = await makeRequest.post("/upload", formData);
				return res.data;
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		if (profilepic || coverpic) {
			let profileUrl = "";
			let coverUrl = "";

			if (coverpic) coverUrl = await upload();
			if (profilepic) profileUrl = await upload();

			await updateUser({
				...inputs,
				coverpic: coverUrl,
				profilepic: profileUrl,
			});
		} else {
			await updateUser(inputs);
		}

		// setIsEdit(false);
	};

	return (
		<div className="editProfile">
			<div className="editProfileContainer">
				<h2>Update</h2>
				<span className="cancel" onClick={() => setIsEdit(false)}>
					<ImCancelCircle />
				</span>
				<form onSubmit={handleUpdate}>
					<div className="inputContainer">
						<label>User name</label>
						<input
							type="text"
							defaultValue={username}
							name="username"
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<label>Full name</label>
						<input
							type="text"
							defaultValue={fullname}
							name="fullname"
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<label>Email</label>
						<input
							type="text"
							defaultValue={email}
							name="email"
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<label>Address</label>
						<input
							type="text"
							defaultValue={address}
							name="address"
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<label>City</label>
						<input
							type="text"
							defaultValue={city}
							name="city"
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<label>Country</label>
						<input
							type="text"
							defaultValue={country}
							name="country"
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<label>Profile Picture</label>
						<input
							type="file"
							defaultValue={profilepic}
							name="profilepic"
							onChange={(e) => setProfilePic(e.target.files[0])}
						/>
					</div>
					<div className="inputContainer">
						<label>Cover Picture</label>
						<input
							type="file"
							defaultValue={coverpic}
							name="coverpic"
							onChange={(e) => setCoverPic(e.target.files[0])}
						/>
					</div>
					<div className="inputContainer">
						<label>Phone Number</label>
						<input
							type="text"
							defaultValue={phone}
							name="phone"
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<label>Bio</label>
						<input
							type="text"
							defaultValue={bio}
							name="bio"
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<label>Password</label>
						<input
							type="password"
							defaultValue={password}
							onChange={handleChange}
						/>
					</div>
					<div className="inputContainer">
						<button type="submit">{loading ? <Loader /> : "UPDATE"}</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProfile;

import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";

const Register = () => {
	const [inputs, setInputs] = useState({
		username: "",
		fullname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const { username, fullname, email, password, confirmPassword } = inputs;

	const { currentUser, register, loading } = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, [currentUser]);

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match!");
		}

		await register(inputs);
		navigate("/login");
	};

	return (
		<div className="register">
			<div className="registerContainer">
				<h2>Register</h2>
				<form onSubmit={submitHandler}>
					<div className="formInput">
						<label>User name *</label>
						<input
							type="text"
							placeholder="Username"
							value={username}
							name="username"
							onChange={handleChange}
						/>
					</div>
					<div className="formInput">
						<label>Full name *</label>
						<input
							type="text"
							placeholder="Full name"
							value={fullname}
							name="fullname"
							onChange={handleChange}
						/>
					</div>
					<div className="formInput">
						<label>Email *</label>
						<input
							type="email"
							placeholder="Email"
							value={email}
							name="email"
							onChange={handleChange}
						/>
					</div>
					<div className="formInput">
						<label>Password *</label>
						<input
							type="password"
							placeholder="Password"
							value={password}
							name="password"
							onChange={handleChange}
						/>
					</div>
					<div className="formInput">
						<label>Comfirm Password *</label>
						<input
							type="password"
							placeholder="Comfirm password"
							value={confirmPassword}
							name="confirmPassword"
							onChange={handleChange}
						/>
					</div>
					<button type="submit">{loading ? <Loader /> : "Register"}</button>
				</form>
				<div className="haveAccount">
					Already have an account? <Link to="/login">Login</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;

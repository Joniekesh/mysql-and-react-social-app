import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const { login, loading } = useContext(AuthContext);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, [currentUser]);

	const submitHandler = async (e) => {
		e.preventDefault();

		const inputs = {
			email,
			password,
		};

		try {
			await login(inputs);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="login">
			<div className="container">
				<h2>Login</h2>
				<form onSubmit={submitHandler}>
					<div className="formInput">
						<label>Email *</label>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="formInput">
						<label>Password *</label>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button type="submit">{loading ? <Loader /> : "Login"}</button>
				</form>
				<div className="haveAccount">
					Don't have an account? <Link to="/register">Register</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;

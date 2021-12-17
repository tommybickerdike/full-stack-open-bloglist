import React, { useState } from "react";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import { login } from "../services/login";
import PropTypes from "prop-types";

const LoginForm = ({ setUser, setNotification }) => {
	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await login(username, password);
			setUser(user);
		} catch (exception) {
			setNotification("wrong username or password", 10, "bad");
		}
	};

	const [username, setUsername] = useState([]);
	const [password, setPassword] = useState([]);

	return (
		<form onSubmit={handleLogin}>
			<div>
				<label htmlFor="username">User Name</label>
				<input
					id="username"
					type="text"
					autoComplete="username"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<label htmlFor="password">Password</label>
			<input
				id="password"
				type="password"
				autoComplete="current-password"
				value={password}
				name="Password"
				onChange={({ target }) => setPassword(target.value)}
			/>
			<button type="submit" id="login-button">
				Login
			</button>
		</form>
	);
};

LoginForm.propTypes = {
	setNotification: PropTypes.func.isRequired,
	setUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (value, time, style) => {
			dispatch(setNotification(value, time, style));
		},
		setUser: (user) => {
			dispatch(setUser(user));
		},
	};
};

export default connect(null, mapDispatchToProps)(LoginForm);

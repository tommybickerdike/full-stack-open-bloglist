import React from "react";
import PropTypes from "prop-types";

const logout = (setUser, setNotification) => {
	window.localStorage.removeItem("user");
	setUser(null);
	if (setNotification) {
		setNotification({ message: "logged out", style: "good" });
	}
};

const UserInfo = ({ user, setUser, setNotification }) => (
	<div>
		<p>{user.name} logged in</p>
		<button onClick={() => logout(setUser, setNotification)}>Logout</button>
	</div>
);

UserInfo.propTypes = {
	user: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired,
	setNotification: PropTypes.func,
};

export default UserInfo;

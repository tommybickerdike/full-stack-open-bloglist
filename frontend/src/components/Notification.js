import React from "react";
import PropTypes from "prop-types";

const Notification = ({ notification, setNotification }) => {
	if (notification !== null) {
		setTimeout(() => {
			setNotification(null);
		}, 5000);
	}

	const goodStyle = {
		margin: "1rem 0",
		padding: ".5rem 1rem",
		color: "white",
		background: "green",
		borderRadius: ".25rem",
	};

	const badStyle = {
		margin: "1rem 0",
		padding: ".5rem 1rem",
		color: "white",
		background: "red",
		borderRadius: ".25rem",
	};

	return notification === null ? null : (
		<div
			id="notification"
			style={notification.style === "good" ? goodStyle : badStyle}
		>
			{notification.message}
		</div>
	);
};

Notification.propTypes = {
	notification: PropTypes.object.isRequired,
	setNotification: PropTypes.func.isRequired,
};

export default Notification;

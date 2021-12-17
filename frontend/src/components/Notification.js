import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Notification = ({notification}) => {
	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
		display: notification.style === "hidden" ? "none" : "block",
		backgroundColor: notification.style === "good" ? "green" : "red",
	};

	return notification.message ? (
		<div id="notification" style={style}>
			{notification.message}
		</div>
	) : (
		""
	);
};

Notification.propTypes = {
	notification: PropTypes.object,
};

const mapStateToProps = (state) => {
	return {
		notification: state.notification,
	};
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;

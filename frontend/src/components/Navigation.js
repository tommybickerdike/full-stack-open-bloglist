import React from "react";
import { Toolbar, AppBar, Button, IconButton, Box } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { logout } from "../reducers/userReducer";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const handleLogout = (props) => {
	props.logout();
	props.setNotification("logged out", 10, "good");
};

const Navigation = (props) => {
	return (
		<AppBar position="sticky">
			<Toolbar>
				<Button to="/blogs" color="inherit" component={Link}>
					Blogs
				</Button>
				<Button to="/users" color="inherit" component={Link}>
					Users
				</Button>
				<Box sx={{ flexGrow: 1 }}></Box>
				{props.user.name} logged in
				<IconButton
					title="Logout"
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
					onClick={() => handleLogout(props)}
				>
					<PowerSettingsNewIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

Navigation.propTypes = {
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: JSON.parse(state.user),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (message, timeout, style) => {
			dispatch(setNotification(message, timeout, style));
		},
		logout: () => {
			dispatch(logout());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

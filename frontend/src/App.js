import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import BlogList from "./routes/BlogList";
import UserList from "./routes/UserList";
import User from "./routes/User";
import Blog from "./routes/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Navigation from "./components/Navigation";
import Toggle from "./components/Toggle";
import PropTypes from "prop-types";
import { initialize as initUser } from "./reducers/userReducer";
import { Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

const App = ({ user }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initUser());
	}, [dispatch]);

	const theme = createTheme();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Notification />
			{user === null ? (
				<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
					<Toggle buttonLabel="Login">
						<LoginForm />
					</Toggle>
				</Container>
			) : (
				<main>
					<Navigation />
					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<h2>blogs</h2>
						<Switch>
							<Route path="/user/:slug">
								<User />
							</Route>
							<Route path="/users">
								<UserList />
							</Route>
							<Route path="/blog/:slug">
								<Blog />
							</Route>
							<Route path="/">
								<BlogList />
							</Route>
						</Switch>
					</Container>
				</main>
			)}
		</ThemeProvider>
	);
};

App.propTypes = {
	user: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => {
	return {
		initUser: (user) => {
			dispatch(initUser(user));
		},
	};
};
const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

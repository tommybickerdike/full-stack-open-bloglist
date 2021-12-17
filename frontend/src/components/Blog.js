import React, { useState } from "react";
import blogService from "../services/blogs";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Likes from "./Likes";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, user }) => {
	const [visible, setVisible] = useState(false);
	const [removed, setRemoved] = useState(false);

	const blogStyle = {
		padding: "1rem",
		border: "1px solid #bbb",
		marginBottom: "-1px",
		clear: "both",
	};

	const buttonStyle = {
		float: "right",
	};

	const handleRemove = async () => {
		try {
			if (
				window.confirm(
					`Do you really want to remove ${blog.title} by ${blog.author}?`
				)
			) {
				await blogService.remove(blog);
				setRemoved(true);
			}
		} catch (exception) {
			setNotification("could not remove", 10);
		}
	};

	const detailsStyle = {
		clear: "both",
		paddingTop: "1rem",
		borderTop: "1px solid #ddd",
		marginTop: "1rem",
	};

	const showWhenUser = {
		display: blog.user.username === user.username ? "block" : "none",
	};

	const hideWhenRemoved = { display: removed ? "none" : "block" };
	const hideWhenVisible = { display: visible ? "none" : "block" };
	const showWhenVisible = { display: visible ? "block" : "none" };

	const toggle = () => {
		setVisible(!visible);
	};

	return (
		<div style={{ ...blogStyle, ...hideWhenRemoved }}>
			<Link to={`/blog/${blog.id}`}>
				{blog.title}, {blog.author}
			</Link>

			<button
				data-testid="blog__toggle-init"
				style={{ ...hideWhenVisible, ...buttonStyle }}
				onClick={toggle}
			>
				View
			</button>
			<button style={{ ...showWhenVisible, ...buttonStyle }} onClick={toggle}>
				Hide
			</button>
			<div
				className="blog__toggle-content"
				style={{ ...showWhenVisible, ...detailsStyle }}
			>
				<p>
					<a href="{blog.url}" target="_blank">
						{blog.url}
					</a>
				</p>
				<Likes blog={blog} />

				<p>Added by {blog.user.name}</p>

				<button style={showWhenUser} onClick={handleRemove}>
					remove
				</button>
			</div>
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: JSON.parse(state.user),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (value, time, style) => {
			dispatch(setNotification(value, time, style));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);

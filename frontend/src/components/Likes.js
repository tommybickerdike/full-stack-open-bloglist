import React, { useState } from "react";
import blogService from "../services/blogs";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
	if (!blog.likes) {
		return null;
	}

	const [likes, setLikes] = useState(blog.likes);

	const handleLike = async () => {
		try {
			const updatedBlog = await blogService.like(blog, likes);
			setLikes(updatedBlog.likes);
		} catch (exception) {
			setNotification("could not like", 10);
		}
	};

	return (
		<p>
			Likes {likes}{" "}
			<button onClick={handleLike} data-testid="blog__like-button">
				Like
			</button>
		</p>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (value, time) => {
			dispatch(setNotification(value, time));
		},
	};
};

export default connect(null, mapDispatchToProps)(Blog);

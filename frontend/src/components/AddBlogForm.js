import React, { useState } from "react";
import blogService from "../services/blogs";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { addBlog } from "../reducers/blogReducer";
import PropTypes from "prop-types";

const AddBlog = ({ setNotification, addBlog }) => {
	const [title, setTitle] = useState([]);
	const [author, setAuthor] = useState([]);
	const [url, setUrl] = useState([]);

	const handleAdd = async (event) => {
		event.preventDefault();

		try {
			const newBlog = await blogService.addNew(title, author, url);
			addBlog(newBlog);
			setNotification(`A new blog: "${title}" by ${author} added`, 10, "good");
			setTitle("");
			setAuthor("");
			setUrl("");
		} catch (exception) {
			setNotification("could not add blog", 10);
		}
	};

	return (
		<form onSubmit={handleAdd}>
			<div>
				<label htmlFor="title">Title</label>
				<input
					id="title"
					type="text"
					value={title}
					name="Title"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				<label htmlFor="author">Author</label>
				<input
					id="author"
					type="text"
					value={author}
					name="Author"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				<label htmlFor="url">URL</label>
				<input
					id="url"
					type="text"
					value={url}
					name="URL"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type="submit">create</button>
		</form>
	);
};

AddBlog.propTypes = {
	addBlog: PropTypes.func.isRequired,
	setNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (value, time, style) => {
			dispatch(setNotification(value, time, style));
		},
		addBlog: (newBlog) => {
			dispatch(addBlog(newBlog));
		},
	};
};

export default connect(null, mapDispatchToProps)(AddBlog);

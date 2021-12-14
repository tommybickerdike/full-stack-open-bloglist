import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const AddBlog = ({ blogs, setBlogs, setNotification, toggleRef }) => {
	const [title, setTitle] = useState([]);
	const [author, setAuthor] = useState([]);
	const [url, setUrl] = useState([]);

	const handleAdd = async (event) => {
		event.preventDefault();

		try {
			const newBlog = await blogService.addNew(title, author, url);
			const newBlogs = blogs.concat(newBlog);
			setBlogs(newBlogs);
			setTitle("");
			setAuthor("");
			setUrl("");
			if (setNotification) {
				setNotification({
					message: `A new blog: "${title}" by ${author} added`,
					style: "good",
				});
			}
			if (toggleRef) toggleRef.current.toggleVisibility();
		} catch (exception) {
			if (setNotification) {
				setNotification({ message: "could not add blog", style: "bad" });
			}
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
	blogs: PropTypes.array.isRequired,
	setBlogs: PropTypes.func.isRequired,
	setNotification: PropTypes.func,
	toggleRef: PropTypes.object,
};

export default AddBlog;

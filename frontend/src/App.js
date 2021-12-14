import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import Toggle from "./components/Toggle";
import blogService from "./services/blogs";
import userService from "./services/user";

const App = () => {
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState([]);
	const [notification, setNotification] = useState(null);
	const blogFormRef = useRef();

	const sortedByLike = blogs.sort(function (a, b) {
		if (a.likes < b.likes) {
			return 1;
		}
		if (a.likes > b.likes) {
			return -1;
		}
		return 0;
	});

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
		userService.getUser().then((user) => setUser(user));
	}, []);

	return (
		<main>
			<Notification
				notification={notification}
				setNotification={setNotification}
			/>
			{user === null ? (
				<Toggle buttonLabel="Login">
					<LoginForm setUser={setUser} setNotification={setNotification} />
				</Toggle>
			) : (
				<div>
					<h2>blogs</h2>
					<UserInfo
						user={user}
						setUser={setUser}
						setNotification={setNotification}
					/>
					<Toggle buttonLabel="Create new blog" ref={blogFormRef}>
						<AddBlogForm
							toggleRef={blogFormRef}
							blogs={blogs}
							setBlogs={setBlogs}
							setNotification={setNotification}
						/>
					</Toggle>
					<div id="blogs">
						{sortedByLike.map((blog) => (
							<Blog
								key={blog.id}
								blog={blog}
								setNotification={setNotification}
								user={user}
							/>
						))}
					</div>
				</div>
			)}
		</main>
	);
};

export default App;

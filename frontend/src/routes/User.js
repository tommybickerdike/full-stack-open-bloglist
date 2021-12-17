import React from "react";
import { useResource } from "../hooks/useResource";
import { useRouteMatch } from "react-router";

const UserList = () => {
	const userUrl = useRouteMatch("/user/:slug");
	const userId = userUrl ? userUrl.params.slug : "";

	const [users] = useResource("/api/users");

	const foundUser = users.find((item) => item.id === userId);

	if (!foundUser) {
		return null;
	}

	return (
		<div>
			<h1>{foundUser.name}</h1>
			<h2>Added Blogs</h2>
			<ul>
				{foundUser.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	);
};

export default UserList;

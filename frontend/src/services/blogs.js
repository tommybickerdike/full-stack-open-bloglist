import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
	const request = await axios.get(baseUrl);
	try {
		return request.data;
	} catch {
		return request.data;
	}
};

const addNew = async (title, author, url) => {
	const user = JSON.parse(window.localStorage.getItem("user"));

	const data = {
		title: title,
		author: author,
		url: url,
	};

	const headers = { Authorization: `bearer ${user.token}` };
	const response = await axios.post(baseUrl, data, { headers: headers });
	try {
		return response.data;
	} catch {
		return response.data;
	}
};

const like = async (blog, likes) => {
	const user = JSON.parse(window.localStorage.getItem("user"));
	const blogURL = `${baseUrl}/${blog.id}`;
	const increment = likes + 1;

	const data = {
		author: blog.author,
		title: blog.title,
		url: blog.url,
		likes: increment,
	};

	const headers = { Authorization: `bearer ${user.token}` };
	const response = await axios.put(blogURL, data, { headers: headers });

	try {
		return response.data;
	} catch {
		return response.data;
	}
};

const remove = async (blog) => {
	const user = JSON.parse(window.localStorage.getItem("user"));
	const blogURL = `${baseUrl}/${blog.id}`;

	const headers = { Authorization: `bearer ${user.token}` };
	const response = await axios.delete(blogURL, { headers: headers });

	try {
		return response.data;
	} catch {
		return response.data;
	}
};

const exports = {
	getAll,
	addNew,
	like,
	remove,
};

export default exports;

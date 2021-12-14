const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
	if (!request.user) {
		return response.status(403).json({ error: "user does not exist" }).end();
	}

	const user = await User.findById(request.user);

	const blog = new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		user: user.id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	response.status(201).json(savedBlog.toJSON()).end();
});

blogsRouter.post("/:id/comments", async (request, response) => {
	const blogToComment = await Blog.findById(request.params.id);
	const comment = request.body.comment;

	if (!blogToComment) {
		return response.status(404).json({ error: "blog not found" }).end();
	}
	if (comment) {
		blogToComment.comments.push(comment);
		const savedBlog = await blogToComment.save();
		response.status(200).json(savedBlog.toJSON()).end();
	}

	return response.status(403).json({ error: "missing comment" });
});

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id).populate("user", {
		username: 1,
		name: 1,
	});
	response.json(blog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
	blogToDelete = await Blog.findById(request.params.id);

	if (!blogToDelete) {
		return response.status(404).json({ error: "blog not found" }).end();
	}
	if (blogToDelete.user.toString() === request.user) {
		await Blog.findByIdAndRemove(request.params.id);
		return response.status(204).end();
	}

	return response.status(403).json({ error: "token missing or invalid" });
});

blogsRouter.put("/:id", async (request, response) => {
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		request.body,
		{
			new: true,
		}
	);
	response.json(updatedBlog);
});

module.exports = blogsRouter;

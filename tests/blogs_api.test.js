const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}

	for (let user of helper.initialUsers) {
		let userObject = new User(user);
		await userObject.save();
	}
});

describe("general blog api calls", () => {
	test("a user exists and a token can be obtained", async () => {
		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
	});

	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	}, 1500);

	test("_id converted to id", async () => {
		const response = await api.get("/api/blogs");
		const contents = response.body;
		expect(contents[0].id).toBeDefined();
		expect(contents[0]._id).not.toBeDefined();
	});

	test("create new blog", async () => {
		const postBlog = {
			title: "New One",
			author: "John Snow",
			url: "https://www.sasadadasd.com",
			likes: 12,
		};
		await api
			.post("/api/blogs")
			.set("Authorization", `bearer ${await helper.token()}`)
			.send(postBlog)
			.expect(201);
		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
		expect(blogsAtEnd.slice(-1)[0].title).toEqual(postBlog.title);
		expect(blogsAtEnd.slice(-1)[0].user.toString()).toContain(
			helper.userForToken.id
		);
	});

	test("cannot create a blog without a token", async () => {
		const postBlog = {
			title: "New One",
			author: "John Snow",
			url: "https://www.sasadadasd.com",
			likes: 12,
		};
		await api.post("/api/blogs").send(postBlog).expect(403);
		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	});

	test("default to 0 likes", async () => {
		const postBlog = {
			title: "New One",
			author: "John Snow",
			url: "https://www.sasadadasd.com",
		};
		await api
			.post("/api/blogs")
			.send(postBlog)
			.set("Authorization", `bearer ${await helper.token()}`)
			.expect(201);
		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
		expect(blogsAtEnd.slice(-1)[0].likes).toEqual(0);
	});

	test("missing info post responds 400", async () => {
		const postBlog = {
			author: "John Snow",
		};
		await api
			.post("/api/blogs")
			.set("Authorization", `bearer ${await helper.token()}`)
			.send(postBlog)
			.expect(400);
	});
});

describe("api blog individual mutations", () => {
	test("can delete an existing note", async () => {
		const blogToDelete = new Blog(helper.initialBlogs[1]);
		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set("Authorization", `bearer ${await helper.token()}`)
			.expect(204);
		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);
		const contents = blogsAtEnd.map((r) => r.id);
		expect(contents).not.toContain(blogToDelete.id);
	}, 500);

	test("can get an existing note", async () => {
		const blogToGet = new Blog(helper.initialBlogs[1]);
		await api.get(`/api/blogs/${blogToGet.id}`).expect(200);
	});

	test("can update an existing note", async () => {
		const blogToUpdate = new Blog(helper.initialBlogs[2]);
		const newLikes = 22;
		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.set("Authorization", `bearer ${await helper.token()}`)
			.send({ likes: newLikes })
			.expect(200);
		const blogsAtEnd = await helper.blogsInDb();
		const blogAtEnd = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);
		expect(blogAtEnd.likes).toBe(newLikes);
	});
});

afterAll(() => {
	mongoose.connection.close();
});

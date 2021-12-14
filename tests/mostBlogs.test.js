const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

describe("total likes", () => {
	const manyBlogResult = {
		author: "Robert C. Martin",
		blogs: 3,
	};

	const singleBlogResult = {
		author: "Edsger W. Dijkstra",
		blogs: 1,
	};

	test("find the author with the most blogs from a list", () => {
		const result = listHelper.mostBlogs(helper.initialBlogs);
		expect(result).toEqual(manyBlogResult);
	});

	test("find a single author count from a list of one", () => {
		const result = listHelper.mostBlogs(helper.listWithOneBlog);
		expect(result).toEqual(singleBlogResult);
	});
});

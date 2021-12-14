const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

describe("total likes", () => {
	const manyBlogResult = {
		author: "Edsger W. Dijkstra",
		likes: 17,
	};

	const singleBlogResult = {
		author: "Edsger W. Dijkstra",
		likes: 5,
	};

	test("find the author with the most likes from a list", () => {
		const result = listHelper.mostLikes(helper.initialBlogs);
		expect(result).toEqual(manyBlogResult);
	});

	test("find a single author likes from a list of one", () => {
		const result = listHelper.mostLikes(helper.listWithOneBlog);
		expect(result).toEqual(singleBlogResult);
	});
});

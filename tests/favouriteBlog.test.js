const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

describe("favorite blog", () => {
	const mostLikedBlog = helper.initialBlogs[2];

	test("if one in array, favoriteBlog finds self", () => {
		const result = listHelper.favoriteBlog(helper.listWithOneBlog);
		expect(result).toEqual(helper.listWithOneBlog[0]);
	});

	test("favoriteBlog can find the most liked blog from long list", () => {
		const result = listHelper.favoriteBlog(helper.initialBlogs);
		expect(result).toEqual(mostLikedBlog);
	});
});

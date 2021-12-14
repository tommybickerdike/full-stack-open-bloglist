const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

describe("total likes", () => {
	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(helper.listWithOneBlog);
		expect(result).toBe(5);
	});

	test("when list has many blogs, equals the likes of that", () => {
		const result = listHelper.totalLikes(helper.initialBlogs);
		expect(result).toBe(36);
	});
});

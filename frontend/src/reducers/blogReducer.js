import blogsService from "../services/blogs";

const reducer = (state = [], action) => {
	switch (action.type) {
	case "LOAD_BLOGS":
		return action.data.sort((a, b) => b.likes - a.likes);
	case "ADD_BLOG":
		return state.concat(action.data);
	default:
		return state;
	}
};

export const initialize = () => {
	return async (dispatch) => {
		const initBlogs = await blogsService.getAll();
		dispatch({
			type: "LOAD_BLOGS",
			data: initBlogs,
		});
	};
};

export const addBlog = (newBlog) => {
	return async (dispatch) => {
		dispatch({
			type: "ADD_BLOG",
			data: newBlog,
		});
	};
};

export default reducer;

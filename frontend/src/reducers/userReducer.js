const initialState = window.localStorage.getItem("user");

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case "INIT_USER":
		return initialState;
	case "SET_USER":
		return action.data;
	default:
		return state;
	}
};

export const initialize = () => {
	return async (dispatch) => {
		dispatch({
			type: "INIT_USER",
		});
	};
};

export const setUser = (user) => {
	return async (dispatch) => {
		dispatch({
			type: "SET_USER",
			data: JSON.stringify(user),
		});
	};
};

export const logout = () => {
	window.localStorage.removeItem("user");
	return async (dispatch) => {
		dispatch({
			type: "SET_USER",
			data: null,
		});
	};
};

export default reducer;

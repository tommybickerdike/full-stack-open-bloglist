const initialState = { message: "", style: "hidden" };
let notificationTimer;

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case "SET_NOTIFICATION":
		return action.data;
	case "CLEAR_NOTIFICATION":
		return initialState;
	default:
		return state;
	}
};

export const setNotification = (message, timeout, style) => {
	return async (dispatch) => {
		const seconds = timeout * 1000;

		const data = { message: message, style: style };

		clearTimeout(notificationTimer);

		notificationTimer = setTimeout(() => {
			dispatch({ type: "CLEAR_NOTIFICATION" });
		}, seconds);

		dispatch({ type: "SET_NOTIFICATION", data: data });
	};
};

export default reducer;

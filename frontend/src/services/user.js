const getUser = async () => {
	const user = window.localStorage.getItem("user");
	if (user !== "undefined") {
		return JSON.parse(user);
	} else {
		return null;
	}
};

const exports = {
	getUser,
};

export default exports;

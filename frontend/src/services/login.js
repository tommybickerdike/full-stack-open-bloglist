import axios from "axios";
const baseUrl = "/api/login";

export const login = async (username, password) => {
	const response = await axios.post(baseUrl, {
		username: username,
		password: password,
	});
	try {
		window.localStorage.setItem("user", JSON.stringify(response.data));
		return response.data;
	} catch (error) {
		return error;
	}
};

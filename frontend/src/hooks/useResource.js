import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
	const [resources, setResources] = useState([]);

	const getAll = useCallback(async () => {
		const response = await axios.get(baseUrl);
		try {
			setResources(response.data);
		} catch (error) {
			setResources(error);
		}
	}, [setResources, baseUrl]);

	useEffect(() => {
		getAll();
	}, [getAll]);

	const create = async (resource) => {
		const response = await axios.post(baseUrl, resource);
		try {
			getAll();
			return response.data;
		} catch (error) {
			return error;
		}
	};

	const service = {
		create,
		getAll,
	};

	return [resources, service];
};

export default useResource;

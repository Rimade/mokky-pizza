import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_KEY;

export const getPizzas = async (params) => {
	const response = await axios.get(`${API_BASE_URL}/items`, {
		params,
	});
	return response.data;
};

export const getOnePizza = async (id) => {
	const response = await axios.get(`${API_BASE_URL}/items/${id}`);
	return response.data;
};

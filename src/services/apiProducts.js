import { api } from "../lib/axios";

export async function getAllProducts() {
	const url = `/products`;

	try {
		const response = await api.get(url);
		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message || "Something went wrong"
		);
	}
}

export async function createProduct({
	name,
	description,
	price,
	color,
	imageUrl,
}) {
	const url = `/products`;

	const data = {
		name,
		description,
		color,
		price,
		imageUrl,
	};

	try {
		const response = await api.post(url, data);

		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message || "Something went wrong"
		);
	}
}

export async function getProduct(id) {
	const url = `/products/${id}`;

	try {
		const response = await api.get(url);

		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message || "Something went wrong"
		);
	}
}

export async function editProduct({
	id,
	name,
	color,
	description,
	imageUrl,
	price,
}) {
	const url = `/products/${id}`;
	const data = {
		name,
		description,
		color,
		imageUrl,
		price,
	};

	try {
		const response = await api.put(url, data);

		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message || "Something went wrong"
		);
	}
}

export async function deleteProduct(id) {
	const url = `/products/${id}`;

	try {
		const response = await api.delete(url, id);

		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.message || "Something went wrong"
		);
	}
}

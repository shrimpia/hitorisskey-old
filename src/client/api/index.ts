import { apiUrl } from "../config";

export const apiAsync = (endpoint: string, params?: any) => {
	return fetch(`${apiUrl}/${endpoint}`, {
		body: params ? JSON.stringify(params): '',
		method: 'POST',
	}).then(f => f.json());
}

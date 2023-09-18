import { getCookie } from "./cookies";

import { camelCaseKeys, snakeCaseKeys, camelToSnakeCase } from "./string";

export const REQUEST_METHODS = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
};

type Query = { [key: string]: string } | null;

interface IRequestHeaders {
	type?: string;
	body?: { [key: string]: any } | null;
}

export interface IAsyncRequestOptions extends IRequestHeaders {
	query?: Query;
}

export const getAuthorizationBearer = async (): Promise<HeadersInit> => {
	return new Promise((resolve, reject) => {
		chrome.cookies.getAll({}, function (allCookies) {
			// Find the cookie named "genius_user_auth_token"
			const currentUserAuthToken = allCookies.find(
				(cookie) => cookie.name === "genius_user_auth_token"
			);

			if (currentUserAuthToken) {
				resolve({
					Authorization: `Bearer ${currentUserAuthToken.value}`,
				});
			} else {
				resolve({});
			}
		});
	});
};

export const getRequestHeaders = async ({ type, body }: IRequestHeaders) => {
	const authorizationHeaders = await getAuthorizationBearer();
	return {
		headers: {
			"Content-Type": "application/json",
			...authorizationHeaders,
		} as HeadersInit,
		method: type,
		body: body ? JSON.stringify(snakeCaseKeys(body)) : null,
	};
};

function formatQueryString(query?: Query) {
	if (!query) {
		return "";
	}

	return Object.entries(query).reduce((qs, [key, value]) => {
		if (!value) return qs;

		const snakeCaseKey = camelToSnakeCase(key);
		const encodedValue = encodeURI(String(value).replace("#", ""));

		return qs
			? `${qs}&${snakeCaseKey}=${encodedValue}`
			: `?${snakeCaseKey}=${encodedValue}`;
	}, "");
}

export async function asynchrounousRequest(
	request: string,
	{
		type = REQUEST_METHODS.GET,
		body = null,
		query = null,
	}: IAsyncRequestOptions = {}
) {
	try {
		const queryString = formatQueryString(query);
		const requestHeaders = await getRequestHeaders({ type, body });

		const response = await fetch(
			`${process.env.REACT_APP_BACKEND_URL}/${request}${queryString}`,
			requestHeaders
		);

		const parsedResponse = camelCaseKeys(await response.json());

		if (parsedResponse.statusCode >= 400) {
			throw new Error(
				`Network Error: Status ${parsedResponse.statusCode}, Message: ${parsedResponse.message}`
			);
		}

		return parsedResponse as any;
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error("Network Error:", e);
		throw e;
	}
}

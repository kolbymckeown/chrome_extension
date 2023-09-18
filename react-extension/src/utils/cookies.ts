export function setCookie(
	key: string,
	value: string,
	{ expires }: { expires: string }
) {
	if (typeof document !== "undefined") {
		document.cookie = `${key}=${value}; expires=${expires}; SameSite=None; Secure`;
	}
}

const getCookiesObject = (cookies?: string) => {
	return cookies
		? cookies
				.split(";")
				.map((cookie) => cookie.trim().split("="))
				.reduce(
					(
						cookiesObject: Record<string, string>,
						[cookieKey, cookieValue]
					) => ({
						...cookiesObject,
						[cookieKey]: cookieValue,
					}),
					{}
				)
		: {};
};

export const getCookie = (key: string) =>
	typeof document !== "undefined" && getCookiesObject(document.cookie)[key];

export const deleteCookie = (key: string) => {
	if (typeof document !== "undefined") {
		document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	}
};

export const getServerSideCookie = (
	ctxReq: { headers?: { cookie?: string } },
	key: string
) => {
	return (
		ctxReq.headers &&
		ctxReq.headers.cookie &&
		getCookiesObject(ctxReq.headers.cookie)[key]
	);
};

export const dateDaysFromNow = (days: number) => {
	const currentDate = new Date();
	currentDate.setDate(currentDate.getDate() + days);
	return currentDate.toUTCString();
};

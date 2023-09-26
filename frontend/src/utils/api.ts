import { getCookie } from './cookies';

import { camelCaseKeys, snakeCaseKeys, camelToSnakeCase } from '@/utils/string';
const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 500; // 500ms

export const REQUEST_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type Query = { [key: string]: string } | null;

interface IRequestHeaders {
  type?: string;
  body?: { [key: string]: any } | null;
}

export interface IAsyncRequestOptions extends IRequestHeaders {
  query?: Query;
}

const getAuthorizationBearer = (): HeadersInit => {
  const authToken = getCookie('genius_user_auth_token');

  return authToken
    ? {
        Authorization: `Bearer ${authToken}`,
      }
    : {};
};

const getRequestHeaders = ({ type, body }: IRequestHeaders) => ({
  headers: {
    'Content-Type': 'application/json',
    ...getAuthorizationBearer(),
  } as HeadersInit,
  method: type,
  body: body ? JSON.stringify(snakeCaseKeys(body)) : null,
});

function formatQueryString(query?: Query) {
  if (!query) {
    return '';
  }

  return Object.entries(query).reduce((qs, [key, value]) => {
    if (!value) return qs;

    const snakeCaseKey = camelToSnakeCase(key);
    const encodedValue = encodeURI(String(value).replace('#', ''));

    return qs
      ? `${qs}&${snakeCaseKey}=${encodedValue}`
      : `?${snakeCaseKey}=${encodedValue}`;
  }, '');
}

export async function asynchrounousRequest(
  request: string,
  {
    type = REQUEST_METHODS.GET,
    body = null,
    query = null,
  }: IAsyncRequestOptions = {}
) {
  let retries = 0;
  let backoff = INITIAL_BACKOFF;

  while (retries < MAX_RETRIES) {
    try {
      const queryString = formatQueryString(query);
      const requestHeaders = getRequestHeaders({ type, body });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${request}${queryString}`,
        requestHeaders
      );

      const parsedResponse = camelCaseKeys(await response.json());

      if (parsedResponse.statusCode >= 400) {
        retries++;
        if (retries < MAX_RETRIES) {
          // Wait for the backoff duration then retry
          await new Promise((res) => setTimeout(res, backoff));
          // Double the backoff time for the next iteration
          backoff *= 2;
          continue;
        } else {
          throw new Error(
            `Network Error: Status ${parsedResponse.statusCode}, Message: ${parsedResponse.message}`
          );
        }
      }

      return parsedResponse as any;
    } catch (e) {
      // If the error is not related to statusCode >= 400, we might want to handle it differently
      // @ts-ignore
      if (e.message && !e.message.startsWith('Network Error')) {
        // eslint-disable-next-line no-console
        console.error('Network Error:', e);
        throw e;
      }
    }
  }
  throw new Error('Max retries reached');
}

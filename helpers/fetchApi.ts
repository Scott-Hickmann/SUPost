import { ResponseDataBase } from '../types';
import { parseResponseData } from './parsers/response';

export interface FetchApiParams<
  T extends ResponseDataBase = undefined,
  P = undefined
> {
  path: string;
  payload?: P;
  parser?: (value: unknown) => T | undefined;
  origin?: string;
}

export async function fetchApi<
  T extends ResponseDataBase = undefined,
  P = undefined
>({
  path,
  payload,
  parser,
  origin = '/api'
}: FetchApiParams<T, P>): Promise<T> {
  const response = await fetch(`${origin}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload ?? {})
  });
  if (!response.ok) {
    const message = await response.text();
    throw message;
  }
  const json = await response.json();
  const responseData = await parseResponseData(json);
  if (!responseData) {
    throw Error('Invalid response');
  }
  if (!responseData.success) {
    throw responseData.error || 'Unknown error';
  }
  if (!parser) return undefined as T;
  const data = parser(responseData.data);
  if (!data) {
    throw Error('Invalid data');
  }
  return data;
}

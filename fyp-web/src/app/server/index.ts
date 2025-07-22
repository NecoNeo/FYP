type RequestMethod = 'GET' | 'POST';

interface RequestOptions {
  method?: RequestMethod;
  headers?: HeadersInit;
  body?: any;
}

const BASE_URL = 'http://127.0.0.1:8000';

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`Request Failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/** GET request */
export function get<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint, { method: 'GET' });
}

/** POST request */
export function post<T>(endpoint: string, data: any): Promise<T> {
  return request<T>(endpoint, {
    method: 'POST',
    body: data,
  });
}

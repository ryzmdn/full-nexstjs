const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options;

  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API Error: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

export function apiGet<T>(
  endpoint: string,
  options?: Omit<RequestOptions, 'method'>,
) {
  return fetchAPI<T>(endpoint, { ...options, method: 'GET' });
}

export function apiPost<T>(
  endpoint: string,
  data?: unknown,
  options?: Omit<RequestOptions, 'method' | 'body'>,
) {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

export function apiPut<T>(
  endpoint: string,
  data?: unknown,
  options?: Omit<RequestOptions, 'method' | 'body'>,
) {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

export function apiDelete<T>(
  endpoint: string,
  options?: Omit<RequestOptions, 'method'>,
) {
  return fetchAPI<T>(endpoint, { ...options, method: 'DELETE' });
}

export function apiPatch<T>(
  endpoint: string,
  data?: unknown,
  options?: Omit<RequestOptions, 'method' | 'body'>,
) {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
}

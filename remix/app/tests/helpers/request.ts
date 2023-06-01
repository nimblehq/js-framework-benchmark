interface MakeRequest {
  url: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT';
  headers?: HeadersInit;
}

export const makeRequest = ({ url, method, headers }: MakeRequest): Request => {
  return new Request(`http://localhost:3400${url}`, {
    method: method,
    headers: headers,
  });
};

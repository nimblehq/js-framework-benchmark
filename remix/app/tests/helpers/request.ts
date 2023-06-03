interface MakeRequest {
  url: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT';
  headers?: HeadersInit;
  body?: BodyInit;
}

export const makeRequest = ({
  url,
  method,
  headers,
  body,
}: MakeRequest): Request => {
  return new Request(`http://localhost:3400${url}`, {
    method: method,
    headers: headers,
    body: body,
  });
};

interface MakeRequest {
  url: string;
  method: 'post' | 'get' | 'put' | 'delete';
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

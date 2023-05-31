import axios, {
  Method as HTTPMethod,
  ResponseType,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

import RequestError from './error';

export const defaultOptions = (): {
  responseType: ResponseType;
  baseURL: string;
  headers?: { [key: string]: string };
} => ({
  responseType: 'json',
  baseURL: `/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const requestManager = <ResponseData = unknown>(
  method: HTTPMethod,
  endpoint: string,
  requestOptions: AxiosRequestConfig = {}
): Promise<ResponseData | RequestError> => {
  const requestParams: AxiosRequestConfig = {
    method,
    url: endpoint,
    ...defaultOptions(),
    ...requestOptions,
  };
  return axios
    .request<ResponseData>(requestParams)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      throw new RequestError({ message: error?.response?.data?.message });
    });
};

export default requestManager;

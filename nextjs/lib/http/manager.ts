import axios, { Method as HTTPMethod, ResponseType, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import RequestError from './error'

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
  })

const requestManager = async (
    method: HTTPMethod,
    endpoint: string,
    requestOptions: AxiosRequestConfig = {}
  ): Promise<JSON> => {
    const requestParams: AxiosRequestConfig = {
      method,
      url: endpoint,
      ...defaultOptions(),
      ...requestOptions,
    }

    return axios
      .request(requestParams)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        throw new RequestError({message: error.message})
      })
  }
  
  export default requestManager;

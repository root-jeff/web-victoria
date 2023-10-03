import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";
import { useLoader } from "./../hooks/useLoader";
import axios, { AxiosError, AxiosResponse } from "axios";

import { ApiErrorResponse } from "./../interfaces/AuthInterface";
import { useAuth } from "./../context/AuthContext";
import { Endpoints } from "./routes";

export const useRequest = () => {
  const { addAlert } = useContext(AlertContext);
  const { isLoading, showLoader, hideLoader } = useLoader();

  //#region AxiosConfig

  const { isAuthenticated, login, logout, token } = useAuth();
  // Create an axios instance for the token endpoint
  const ApiTokenRequest = axios.create({
    baseURL: Endpoints.BaseURL + Endpoints.Api,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  // Create an axios instance for the other endpoints
  const ApiRequest = axios.create({
    baseURL: Endpoints.BaseURL + Endpoints.Api,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Interceptar las solicitudes para agregar el token si el usuario está autenticado
  ApiRequest.interceptors.request.use((config) => {
    if (isAuthenticated && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
  const ApiPostFileRequest = axios.create({
    baseURL: Endpoints.BaseURL + Endpoints.Api,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      otherHeader: "foo",
    },
  });

  //#endregion

  //#region RequestConfig

  const getRequest = async <T extends unknown>(
    endpoint: string,
    params?: object,
    isLoading?: boolean
  ): Promise<T> => {
    showLoader();
    return await ApiRequest.get(endpoint, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        //ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        hideLoader();
      });
  };

  const postRequest = async <T extends unknown>(
    endpoint: string,
    data?: object,
    params?: object
  ): Promise<T> => {
    showLoader();
    return await ApiRequest.post(endpoint, data, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        //ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        hideLoader();
      });
  };

  const postRequestToken = async <T extends unknown>(
    data: string
  ): Promise<T> => {
    showLoader();
    return await ApiTokenRequest.request({
      data,
    })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        //ShowAlertApiError(error);
        console.log(JSON.stringify(error, null, 3));
        throw error;
      })
      .finally(() => {
        hideLoader();
      });
  };

  const postFileRequest = async <T extends unknown>(
    endpoint: string,
    data?: object,
    params?: object
  ): Promise<T> => {
    showLoader();
    return await ApiPostFileRequest.post(endpoint, data, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        console.error(JSON.stringify(error, null, 3));
        //ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        hideLoader();
      });
  };

  //#endregion

  return { getRequest, postRequestToken, postRequest, postFileRequest };
};

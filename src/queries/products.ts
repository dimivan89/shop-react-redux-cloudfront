import axios, { AxiosError } from "axios";
import API_PATHS from "~/constants/apiPaths";
import { AvailableProduct } from "~/models/Product";
import { useQuery, useQueryClient, useMutation } from "react-query";
import React from "react";

import { Product } from "../models/Product";
import { getAuthorizationHeader } from "~/utils/auth";

const BASE_URL = "https://g2ewm6wfnf.execute-api.us-east-1.amazonaws.com/prod";

export const getProducts = async (): Promise<Product[]> => {
  const authHeader = getAuthorizationHeader();
  const headers: Record<string, string> = {
    ...(authHeader.Authorization
      ? { Authorization: authHeader.Authorization }
      : {}),
  };
  const response = await axios.get<Product[]>(`${BASE_URL}/products`, {
    headers,
  });
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const authHeader = getAuthorizationHeader();
  const headers: Record<string, string> = {
    ...(authHeader.Authorization
      ? { Authorization: authHeader.Authorization }
      : {}),
  };
  const response = await axios.get<Product>(`${BASE_URL}/products/${id}`, {
    headers,
  });
  return response.data;
};

export const createProduct = async (
  product: Omit<Product, "id">
): Promise<void> => {
  const authHeader = getAuthorizationHeader();
  const headers: Record<string, string> = {
    ...(authHeader.Authorization
      ? { Authorization: authHeader.Authorization }
      : {}),
  };
  await axios.post(`${BASE_URL}/products`, product, { headers });
};

export function useAvailableProducts() {
  return useQuery<AvailableProduct[], AxiosError>(
    "available-products",
    async () => {
      const res = await axios.get<AvailableProduct[]>(
        `${API_PATHS.bff}/product/available`
      );
      return res.data;
    }
  );
}

export function useInvalidateAvailableProducts() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("available-products", { exact: true }),
    []
  );
}

export function useAvailableProduct(id?: string) {
  return useQuery<AvailableProduct, AxiosError>(
    ["product", { id }],
    async () => {
      const res = await axios.get<AvailableProduct>(
        `${API_PATHS.bff}/product/${id}`
      );
      return res.data;
    },
    { enabled: !!id }
  );
}

export function useRemoveProductCache() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id?: string) =>
      queryClient.removeQueries(["product", { id }], { exact: true }),
    []
  );
}

export function useUpsertAvailableProduct() {
  return useMutation((values: AvailableProduct) => {
    const authHeader = getAuthorizationHeader();
    const headers: Record<string, string> = {
      ...(authHeader.Authorization
        ? { Authorization: authHeader.Authorization }
        : {}),
    };
    return axios.put<AvailableProduct>(`${API_PATHS.bff}/product`, values, {
      headers,
    });
  });
}

export function useDeleteAvailableProduct() {
  return useMutation((id: string) => {
    const authHeader = getAuthorizationHeader();
    const headers: Record<string, string> = {
      ...(authHeader.Authorization
        ? { Authorization: authHeader.Authorization }
        : {}),
    };
    return axios.delete(`${API_PATHS.bff}/product/${id}`, {
      headers,
    });
  });
}

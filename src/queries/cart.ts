import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { Cart, CartItem } from "../models/CartItem";
import { getAuthorizationHeader } from "~/utils/auth";

export function useCart(userId: string) {
  return useQuery<Cart>("cart", async () => {
    const authHeader = getAuthorizationHeader();
    const headers: Record<string, string> = {
      ...(authHeader.Authorization
        ? { Authorization: authHeader.Authorization }
        : {}),
    };
    const res = await axios.get(`${API_PATHS.cart}/cart?userId=${userId}`, {
      headers,
    });
    return res.data;
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation(
    (item: CartItem & { user_id: string }) => {
      const authHeader = getAuthorizationHeader();
      const headers: Record<string, string> = {
        ...(authHeader.Authorization
          ? { Authorization: authHeader.Authorization }
          : {}),
      };
      return axios.post(`${API_PATHS.cart}/cart`, item, {
        headers,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries("cart"),
    }
  );
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation(
    (item: CartItem & { user_id: string }) => {
      const authHeader = getAuthorizationHeader();
      const headers: Record<string, string> = {
        ...(authHeader.Authorization
          ? { Authorization: authHeader.Authorization }
          : {}),
      };
      return axios.put(`${API_PATHS.cart}/cart`, item, {
        headers,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries("cart"),
    }
  );
}

export function useClearCart(userId: string) {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      const authHeader = getAuthorizationHeader();
      const headers: Record<string, string> = {
        ...(authHeader.Authorization
          ? { Authorization: authHeader.Authorization }
          : {}),
      };
      return axios.delete(`${API_PATHS.cart}/cart?userId=${userId}`, {
        headers,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries("cart"),
    }
  );
}

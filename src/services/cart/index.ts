import api from "../api/client";
import { Cart, ApiResponse } from "@/types";

export const cartService = {
  async get() {
    return api.get<ApiResponse<Cart>>("/cart");
  },

  async addItem(productId: string, quantity: number, variantId?: string) {
    return api.post<ApiResponse<Cart>>("/cart/items", { productId, quantity, variantId });
  },

  async updateItem(itemId: string, quantity: number) {
    return api.put<ApiResponse<Cart>>(`/cart/items/${itemId}`, { quantity });
  },

  async removeItem(itemId: string) {
    return api.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`);
  },

  async clear() {
    return api.delete<ApiResponse<void>>("/cart");
  },
};

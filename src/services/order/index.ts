import api from "../api/client";
import { Order, ApiResponse } from "@/types";

export const orderService = {
  async create(shippingAddressId: string) {
    return api.post<ApiResponse<Order>>("/orders", { shippingAddressId });
  },

  async getAll() {
    return api.get<ApiResponse<Order[]>>("/orders");
  },

  async getById(id: string) {
    return api.get<ApiResponse<Order>>(`/orders/${id}`);
  },
};

import api from "../api/client";
import { User, ApiResponse } from "@/types";

export const authService = {
  async login(email: string, password: string) {
    return api.post<ApiResponse<{ user: User; token: string }>>("/auth/login", { email, password });
  },

  async register(data: { name: string; email: string; password: string; phone?: string }) {
    return api.post<ApiResponse<{ user: User; token: string }>>("/auth/register", data);
  },

  async getProfile() {
    return api.get<ApiResponse<User>>("/auth/me");
  },

  async logout() {
    return api.post<ApiResponse<void>>("/auth/logout", {});
  },
};

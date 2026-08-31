import api from "../api/client";
import { Product, Category, ApiResponse } from "@/types";

export const productService = {
  async getAll(params?: { category?: string; search?: string; page?: number }) {
    const query = new URLSearchParams();
    if (params?.category) query.set("category", params.category);
    if (params?.search) query.set("search", params.search);
    if (params?.page) query.set("page", String(params.page));
    return api.get<ApiResponse<{ products: Product[]; total: number }>>(`/products?${query}`);
  },

  async getBySlug(slug: string) {
    return api.get<ApiResponse<Product>>(`/products/${slug}`);
  },

  async getFeatured() {
    return api.get<ApiResponse<Product[]>>("/products/featured");
  },

  async getCategories() {
    return api.get<ApiResponse<Category[]>>("/categories");
  },
};

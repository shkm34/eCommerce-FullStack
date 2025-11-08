import apiClient from "../config/api";

export const productService = {
  // Get all products
  getAllProducts: async () => {
    const response = await apiClient.get("/products");
    return response.data;
  },

  // Get single product by ID
  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
};

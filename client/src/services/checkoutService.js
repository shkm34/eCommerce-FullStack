import apiClient from "../config/api";

export const checkoutService = {
  // Process checkout
  processCheckout: async (userInfo) => {
    const response = await apiClient.post("/checkout", userInfo);
    return response;
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    const response = await apiClient.get(`/checkout/${orderId}`);
    return response.data;
  },

  // Get all orders
  getAllOrders: async () => {
    const response = await apiClient.get("/checkout");
    return response.data;
  },
};

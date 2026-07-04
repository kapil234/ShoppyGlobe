import API from "../api/axios";

export const getCart = async () => {
  const { data } = await API.get("/cart");
  return data;
};

export const addToCart = async (productId, quantity = 1) => {
  const { data } = await API.post("/cart/add", {
    productId,
    quantity,
  });

  return data;
};

export const updateCart = async (cartId, quantity) => {
  const { data } = await API.put(`/cart/${cartId}`, {
    quantity,
  });

  return data;
};

export const removeCart = async (cartId) => {
  const { data } = await API.delete(`/cart/${cartId}`);
  return data;
};

export const clearCart = async () => {
  const { data } = await API.delete("/cart/clear/all");
  return data;
};
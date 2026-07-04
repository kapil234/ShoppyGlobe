import { useEffect, useState } from "react";
import API from "../api/axios";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");

        setProducts(data);

      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
};



export default useProducts;
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import useProducts from "../hooks/useProducts";

const ProductList = () => {
  const { products, loading, error } = useProducts();

  const searchTerm = useSelector(
    (state) => state.search.searchTerm
  );

  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <h2 className="text-center text-xl">
        Loading...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-center text-red-500">
        {error}
      </h2>
    );
  }

  return (
    <>
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-3xl font-bold text-gray-700">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try searching with a different product name.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
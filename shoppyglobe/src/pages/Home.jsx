
import ProductList from "../components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/searchSlice";

const Home = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.search.searchTerm);
  return (
    <div className="min-h-screen bg-gray-100">
     

      <main className=" w-full px-6 md:px-10 lg:px-6 py-10">

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome to ShoppyGlobe
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="w-full max-w-lg px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product List */}
        <ProductList />
      </main>
    </div>
  );
};

export default Home;

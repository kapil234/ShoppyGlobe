import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg text-center">

        <h1 className="text-8xl font-bold text-red-500">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          Go Back Home
        </Link>

      </div>
    </div>
  );
};



export default NotFound
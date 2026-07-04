import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/ProtectedRoute";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Cart = lazy(() => import("../components/Cart"));
const Checkout = lazy(() => import("../components/Checkout"));
const ProductDetail = lazy(() => import("../components/ProductDetail"));
const NotFound = lazy(() => import("../pages/NotFound"));

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-14 w-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },

      {
        path: "login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },

      {
        path: "register",
        element: (
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        ),
      },

      {
        path: "product/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductDetail />
          </Suspense>
        ),
      },

      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Checkout />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
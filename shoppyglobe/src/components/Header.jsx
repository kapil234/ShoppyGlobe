import { NavLink } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { logout } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";

const Header = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="bg-amber-500 rounded-b-lg text-white shadow-2xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold"
        >
          ShoppyGlobe
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-6">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-yellow-200 font-semibold"
                : "text-white hover:text-yellow-200 transition-colors duration-300"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "relative flex items-center text-yellow-200"
                : "relative flex items-center text-white hover:text-yellow-200 transition-colors duration-300"
            }
          >
            <ShoppingCart size={26} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-xs w-6 h-6 rounded-full flex justify-center items-center">
                {totalItems}
              </span>
            )}
          </NavLink>

          {user ? (
            <>
              <div className="flex items-center gap-2">
                <User size={20} />
                <span className="font-medium">
                  {user.name}
                </span>
              </div>

              <button
               onClick={() => {
    dispatch(logout());
    dispatch(clearCart());
  }}
                className="flex items-center gap-2 hover:text-yellow-200 transition-colors duration-300 cursor-pointer"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-200 font-semibold"
                    : "text-white hover:text-yellow-200 transition-colors duration-300"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-white text-amber-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Register
              </NavLink>
            </>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Header;
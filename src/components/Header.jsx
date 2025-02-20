import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { clearUser } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";
const Header =() => {
  // Get cart items from Redux store
  const { cart } = useSelector((state) => state.cart);
  // Calculate total quantity of items in cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(clearUser());
    dispatch(clearCart());
  };

  return (
    <header className="bg-white text-blue-600 shadow-md sticky top-0 z-10 w-full">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        <h1 className="text-2xl font-bold text-blue-600">
          <Link to="/" className="hover:text-blue-800 transition-colors">
            <img
              src="https://nimbuscluster.blob.core.windows.net/server01/brained-3-0/undefined/0.7893156340902756.png-tWl15TUBPFp8UbyOvmvgT-1733119766 "
              className=" h-10 w-20 bg-blue-400 p-2 rounded-lg"
            />
          </Link>
        </h1>

        
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-blue-800"
          >
            <FaHome className="text-xl" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <Link
            to="/products"
            className="flex items-center space-x-2 hover:text-blue-800"
          >
            <FaBox className="text-xl" />
            <span className="hidden md:inline">Products</span>
          </Link>

          {/* Cart Icon with Badge */}
          {isLoggedIn && (
            <Link to="/cart" className="relative flex items-center space-x-2">
              
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <FaShoppingCart size={30} />
            </Link>
          )}

          
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:text-blue-800"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="hidden md:inline">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-2 hover:text-blue-800"
            >
              <FaSignInAlt className="text-xl" />
              <span className="hidden md:inline">Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
export default Header

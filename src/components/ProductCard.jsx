import React from "react";
import { FaEye, FaRemoveFormat, FaShoppingCart } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice"; // Import the actions
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart); // Get cart items from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const truncatedTitle =
    product.title.length > 15
      ? product.title.substring(0, 15) + "..."
      : product.title;

  // Find the product in the cart
  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = cartItem !== undefined;
  const cartQuantity = isInCart ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (isLoggedIn) {
      // If the product is already in the cart, increase the quantity
      if (isInCart) {
        dispatch(addToCart({ ...product, quantity: 1 })); // Add one more unit to the cart
      } else {
        dispatch(addToCart({ ...product, quantity: 1 })); // Add product to cart
      }
    } else {
      console.log("Please log in first.");
    }
  };

  const handleRemoveFromCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(product)); // Remove the product from the cart
    }
  };

  const handleDetailsClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-lg relative overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{truncatedTitle}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-xl font-bold mt-2 text-blue-600">${product.price}</p>

      {/* Buttons for Add to Cart and Details */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleAddToCart}
          disabled={!isLoggedIn} // Disable if not logged in
          className={`${
            isInCart
              ? "bg-green-600 hover:bg-green-700"
              : isLoggedIn
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          } text-white p-2 rounded-full w-2/3 flex items-center justify-center`}
        >
          <FaShoppingCart size={20} />
          {isInCart ? ` (${cartQuantity})` :""} 
        </button>
        {isInCart && (
          <button
            onClick={handleRemoveFromCart}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full ml-2 flex items-center justify-center"
          >
            <MdRemoveShoppingCart/>
          </button>
        )}
        <button
          onClick={handleDetailsClick}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full ml-2 flex items-center justify-center"
        >
          <FaEye size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

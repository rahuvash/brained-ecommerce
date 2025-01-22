import React from "react";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const ProductCard = ({ product }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const truncatedTitle =
    product.title.length > 15
      ? product.title.substring(0, 15) + "..."
      : product.title;

  
  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = cartItem !== undefined;
  const cartQuantity = isInCart ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (isLoggedIn) {
      
      if (isInCart) {
        dispatch(addToCart({ ...product, quantity: 1 })); 
      } else {
        dispatch(addToCart({ ...product, quantity: 1 })); 
      }
    } else {
      console.log("Please log in first.");
    }
  };

  const handleRemoveFromCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(product)); 
    }
  };

  const handleDetailsClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <motion.div
      className="border border-gray-200 p-4 rounded-lg shadow-lg relative overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />
      <h3 className="text-lg font-semibold text-gray-800">{truncatedTitle}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-xl font-bold mt-2 text-blue-600">${product.price}</p>

      
      <div className="mt-4 flex justify-between items-center">
        <motion.button
          onClick={handleAddToCart}
          disabled={!isLoggedIn}
          className={`${
            isInCart
              ? "bg-green-600 hover:bg-green-700"
              : isLoggedIn
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          } text-white p-2 rounded-full w-2/3 flex items-center justify-center`}
          whileHover={{ scale: 1.1 }} 
          transition={{ duration: 0.2 }}
        >
          <FaShoppingCart size={20} />
          {isInCart ? ` (${cartQuantity})` : ""}
        </motion.button>
        {isInCart && (
          <motion.button
            onClick={handleRemoveFromCart}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full ml-2 flex items-center justify-center"
            whileHover={{ scale: 1.1 }} 
            transition={{ duration: 0.2 }}
          >
            <MdRemoveShoppingCart />
          </motion.button>
        )}
        <motion.button
          onClick={handleDetailsClick}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full ml-2 flex items-center justify-center"
          whileHover={{ scale: 1.1 }} 
          transition={{ duration: 0.2 }}
        >
          <FaEye size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

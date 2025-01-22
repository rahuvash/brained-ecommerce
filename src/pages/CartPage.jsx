import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart, updateCartItemQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 

const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart({ id: productId })); 
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
    }
  };

  const calculateTotal = () => {
    return cart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2); 
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Link to="/products" className="text-blue-600 hover:text-blue-800">
            Browse Products
          </Link>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="flex items-center justify-between border p-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="font-bold text-blue-600">${item.price}</p>
                </div>

                <div className="flex items-center space-x-4">
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }} // Hover effect for button
                      transition={{ duration: 0.2 }}
                    >
                      -
                    </motion.button>
                    <span className="text-lg font-semibold">{item.quantity}</span>
                    <motion.button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }} // Hover effect for button
                      transition={{ duration: 0.2 }}
                    >
                      +
                    </motion.button>
                  </div>

             
                  <motion.button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    whileHover={{ scale: 1.1 }} // Hover effect for button
                    transition={{ duration: 0.2 }}
                  >
                    <FaTrashAlt size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total and Checkout */}
          <motion.div
            className="mt-8 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold">
              Total: ${calculateTotal()}
            </h3>
            <Link
              to="/checkout"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }} // Hover effect for button
              transition={{ duration: 0.2 }}
            >
              Proceed to Checkout
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CartPage;

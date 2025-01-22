import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cart } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.freeapi.app/api/v1/public/randomproducts/${productId}`,
          { headers: { accept: "application/json" } }
        );
        setProduct(response.data.data);
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);
 
  const cartItem = cart.find((item) => {
   
    return String(item.id) === productId; 
  });

  const isInCart = cartItem !== undefined;

  const cartQuantity = isInCart ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="p-6 text-center">Product not found.</div>;
  }

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.img
          src={product.thumbnail}
          alt={product.title}
          className="rounded-lg w-full h-80 object-cover mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div>
          <motion.h1
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {product.title}
          </motion.h1>
          <motion.p
            className="text-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {product.description}
          </motion.p>
          <motion.p
            className="text-2xl font-bold text-primary-dark mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            ${product.price}
          </motion.p>
          <motion.p
            className="text-sm mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Brand: {product.brand}
          </motion.p>
          <motion.p
            className="text-sm mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Category: {product.category}
          </motion.p>
          <motion.p
            className="text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Rating: {product.rating}
          </motion.p>

          {/* Add to Cart button */}
          <motion.button
            onClick={handleAddToCart}
            className={`${
              isInCart
                ? "bg-green-600 hover:bg-green-700"
                : isLoggedIn
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FaShoppingCart size={20} className="mr-2" />
            {isInCart ? ` (${cartQuantity})` : "Add to Cart"}
          </motion.button>
        </div>
      </motion.div>

      {/* Product Images Carousel */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <h3 className="text-xl font-semibold mb-4">Product Images</h3>
        <div className="flex gap-4 overflow-x-auto">
          {product.images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Product image ${index + 1}`}
              className="w-1/3 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Importing axios for API call
import { motion } from "framer-motion"; // Import motion from Framer Motion

export default function ProductDetailPage() {
  const { productId } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch product details when component mounts
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.freeapi.app/api/v1/public/randomproducts/${productId}`,
          {
            headers: { accept: "application/json" },
          }
        );
        setProduct(response.data.data); // Set product data
      } catch (err) {
        setError("Failed to fetch product details."); // Set error if any
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchProductDetails();
  }, [productId]); // Re-fetch product details if productId changes

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>; // Show loading message
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>; // Show error message
  }

  if (!product) {
    return <div className="p-6 text-center">Product not found.</div>; // Show message if no product found
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
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Add to Cart
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

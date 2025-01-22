// src/pages/NotFound.js

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";  // Import motion from Framer Motion

const NotFound = () => {
  return (
    <motion.div
      className="flex justify-center items-center min-h-screen w-full bg-gray-100"
      initial={{ opacity: 0 }}  // Starting opacity
      animate={{ opacity: 1 }}   // End opacity
      exit={{ opacity: 0 }}      // Fade out when leaving
      transition={{ duration: 0.5 }} // Duration for transition
    >
      <motion.div
        className="text-center p-12 bg-white shadow-xl rounded-lg"
        initial={{ scale: 0.8 }}  // Start from smaller scale
        animate={{ scale: 1 }}    // End at normal scale
        transition={{ duration: 0.5 }}  // Smooth scale transition
      >
        <motion.h1
          className="text-8xl font-bold text-red-500"
          initial={{ y: -50 }} // Start with slight offset vertically
          animate={{ y: 0 }}   // End at normal position
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-4xl text-gray-700 mt-4"
          initial={{ x: -100 }} // Start from the left
          animate={{ x: 0 }}    // End at normal position
          transition={{ duration: 0.5 }}
        >
          Oops! Page not found.
        </motion.p>
        <motion.p
          className="mt-4 text-lg text-gray-500"
          initial={{ opacity: 0 }} // Start with hidden text
          animate={{ opacity: 1 }}  // Fade in text
          transition={{ duration: 0.5 }}
        >
          The page you're looking for doesn't exist.
        </motion.p>
        <Link
          to="/"
          className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
          whileHover={{ scale: 1.1 }} // Hover effect to scale button slightly
        >
          Go to Homepage
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;

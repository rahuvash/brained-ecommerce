// src/pages/NotFound.js

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";  

const NotFound = () => {
  return (
    <motion.div
      className="flex justify-center items-center min-h-screen w-full bg-gray-100"
      initial={{ opacity: 0 }}  
      animate={{ opacity: 1 }}  
      exit={{ opacity: 0 }}      
      transition={{ duration: 0.5 }} 
    >
      <motion.div
        className="text-center p-12 bg-white shadow-xl rounded-lg"
        initial={{ scale: 0.8 }}  
        animate={{ scale: 1 }}   
        transition={{ duration: 0.5 }}  
      >
        <motion.h1
          className="text-8xl font-bold text-red-500"
          initial={{ y: -50 }}
          animate={{ y: 0 }}  
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-4xl text-gray-700 mt-4"
          initial={{ x: -100 }} 
          animate={{ x: 0 }}    
          transition={{ duration: 0.5 }}
        >
          Oops! Page not found.
        </motion.p>
        <motion.p
          className="mt-4 text-lg text-gray-500"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          The page you're looking for doesn't exist.
        </motion.p>
        <Link
          to="/"
          className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
          whileHover={{ scale: 1.1 }} 
        >
          Go to Homepage
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;


import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const  Banner = ()=>   {
  const navigate = useNavigate();

  return (
    <motion.section
      className="bg-gradient-to-r from-primary-light to-accent-light p-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="text-4xl font-display font-bold text-primary-dark"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Welcome to Our Store!
      </motion.h2>
      <motion.p
        className="text-lg text-neutral-dark mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Explore the latest collections and unbeatable prices.
      </motion.p>
      <motion.button
        className="mt-6 bg-accent hover:bg-accent-light text-primary-dark font-bold py-3 px-6 rounded-lg"
        onClick={() => navigate("/products")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        whileHover={{ scale: 1.1 }}
      >
        Start Shopping
      </motion.button>
    </motion.section>
  );
}

export default Banner ; 
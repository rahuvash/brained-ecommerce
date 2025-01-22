// src/components/Banner.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate()
  return (
    <section className="bg-gradient-to-r from-primary-light to-accent-light p-12 text-center">
      <h2 className="text-4xl font-display font-bold text-primary-dark">
        Welcome to Our Store!
      </h2>
      <p className="text-lg text-neutral-dark mt-4">
        Explore the latest collections and unbeatable prices.
      </p>
      <button 
          className="mt-6 bg-accent hover:bg-accent-light text-primary-dark font-bold py-3 px-6 rounded-lg"
          onClick={()=>navigate("/products")}>
        Start Shopping
      </button>
    </section>
  );
}

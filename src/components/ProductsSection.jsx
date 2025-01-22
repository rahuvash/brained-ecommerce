import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = 'https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=8&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid&query=mens-watches';
      const options = { method: 'GET', headers: { accept: 'application/json' } };

      try {
        const response = await axios.request({ url, ...options });
        const data = response.data.data.data; // Extracting the products from the API response
        setProducts(data); // Set the products to the state
      } catch (error) {
        setError("Failed to fetch products.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto p-8">
      <h2 className="text-3xl font-display font-bold text-primary-dark mb-6 text-center">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

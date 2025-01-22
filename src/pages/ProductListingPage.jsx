import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: null,
    priceRange: null,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  // Fetch products from API
  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(
        `https://api.freeapi.app/api/v1/public/randomproducts`,
        {
          params: {
            page: page, // Use the current page passed to the function
            limit: 10,
            query: filters.category || "mens-watches", // Use selected category for query
            inc: "category,price,thumbnail,images,title,id",
          },
        }
      );
      const { data } = response.data;
      console.log(data)
      setProducts(data.data);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.data.totalPages, // Set the totalPages from API response
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.currentPage); // Trigger fetch when currentPage changes
  }, [pagination.currentPage, filters]); // Trigger fetch on page or filter change

  // Apply filters
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !filters.category || product.category === filters.category;
    const matchesPrice =
      !filters.priceRange ||
      (product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max);
    return matchesCategory && matchesPrice;
  });

  // Handle page change for pagination
  const handlePageChange = (page) => {
    if (page > 0 && page <= pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
      }));
    }
  };

  return (
    <div className="bg-neutral-light min-h-screen flex">
      <aside className="w-1/4 p-6">
        <ProductFilter filters={filters} setFilters={setFilters} />
      </aside>
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">Product Listing</h1>
        {filteredProducts.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-neutral-dark">
            No products match the selected filters.
          </p>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-primary text-white rounded-l"
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">{pagination.currentPage}</span>
          <button
            className="px-4 py-2 bg-primary text-white rounded-r"
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

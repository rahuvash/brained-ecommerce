
import React from "react";

import Banner from "../components/Banner";
import ProductsSection from "../components/ProductsSection";

export default function HomePage() {
  return (
    <div className="bg-neutral-light min-h-screen flex flex-col">
      <main className="flex-grow">
        <Banner />
        <ProductsSection />
      </main>
    </div>
  );
}

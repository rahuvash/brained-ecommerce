// Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-display font-bold">E-Commerce</h1>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/products" className="hover:underline">
            Products
          </a>
          <a href="/cart" className="hover:underline">
            Cart
          </a>
          <a href="/login" className="hover:underline">
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}

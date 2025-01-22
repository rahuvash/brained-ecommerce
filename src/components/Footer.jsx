// src/components/Footer.jsx
import React from "react";

const Footer = () =>{
  return (
    <footer className="bg-neutral-dark text-neutral-light py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 E-Commerce. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="/about" className="hover:underline">
            About Us
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
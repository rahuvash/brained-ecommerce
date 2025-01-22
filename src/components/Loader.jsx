// src/components/Loader.jsx
import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-4 h-4 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}

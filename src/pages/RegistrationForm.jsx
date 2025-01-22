import React, { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; // Import the loader component
import { motion } from "framer-motion"; // Import Framer Motion

const RegistrationForm = () =>{
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  const validateForm = ({ name, value }) => {
    let error = "";

    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email format.";
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        error = "Password must be at least 6 characters.";
      }
    }

    if (name === "username") {
      if (!/^[a-z0-9._-]+$/.test(value)) {
        error = "Username must be lowercase and contain no spaces.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const debouncedValidation = (e) => {
    const { name, value } = e.target;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      validateForm({ name, value });
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    debouncedValidation(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    // Validation
    if (!username || !email || !password) {
      toast.error("All fields are required.");
      return;
    }
    if (errors.email || errors.password || errors.username) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);

    // API Call
    const options = {
      method: "POST",
      url: "https://api.freeapi.app/api/v1/users/register",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      data: {
        email,
        password,
        role: "ADMIN",
        username,
      },
    };

    try {
      await axios.request(options);
      toast.success("Registration successful! Redirecting to login...");
      setFormData({ username: "", email: "", password: "" });

      // Redirect to login page after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Register
        </h2>
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <motion.input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </motion.div>
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <motion.input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? "focus:ring-red-400" : "focus:ring-blue-400"
            }`}
            placeholder="Enter your email"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </motion.div>
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <motion.input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password ? "focus:ring-red-400" : "focus:ring-blue-400"
            }`}
            placeholder="Create a password"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </motion.div>
        <motion.button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg font-bold text-white ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? <Loader /> : "Register"}
        </motion.button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already a user?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default RegistrationForm;
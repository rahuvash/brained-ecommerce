import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader"; // Import the loader component
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  const validateForm = ({ name, value }) => {
    let error = "";

    // Username Validation (should be lowercase with no spaces)
    if (name === "username") {
      if (!/^[a-z0-9]+$/.test(value)) {
        error = "Username must be lowercase and contain no spaces.";
      }
    }

    // Password Validation
    if (name === "password") {
      if (value.length < 6) {
        error = "Password must be at least 6 characters.";
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
    const { username, password } = formData;

    if (!username || !password) {
      toast.error("Both fields are required.");
      return;
    }
    if (errors.username || errors.password) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);

    const options = {
      method: "POST",
      url: "https://api.freeapi.app/api/v1/users/login",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      data: {
        username,
        password,
      },
    };

    try {
      const { data } = await axios.request(options);

      // Dispatch login action
      dispatch(
        login({
          user: data.data.user,
          accessToken: data.data.accessToken,
        })
      );

      // Save to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("accessToken", data.data.accessToken);

      toast.success("Login successful! Redirecting...");
      setLoading(false);

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials, please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.username ? "focus:ring-red-400" : "focus:ring-blue-400"
            }`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password ? "focus:ring-red-400" : "focus:ring-blue-400"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg font-bold text-white ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? <Loader /> : "Login"}
        </button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

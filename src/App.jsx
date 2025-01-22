// src/App.jsx
import React,{useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginForm from "./pages/LoginForm";
import RegistrationForm from "./pages/RegistrationForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/authSlice";
import CartPage from "./pages/CartPage";



export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check localStorage for user data and accessToken
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      // Parse and update Redux state
      dispatch(
        setUser({
          user: JSON.parse(storedUser),
          accessToken,
        })
      );
    }
  }, [dispatch]);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer/> 
    </Router>
  );
}

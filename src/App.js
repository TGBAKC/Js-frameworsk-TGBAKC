import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./Components/CartContext/CartContext";
import Layout from "./Components/Layout/Layout";

import SearchBar from "./Components/SearchBar/SearchBar";
import Homepage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CheckoutPage from "./Pages/CheckoutPage";
import CheckoutSuccessPage from "./Pages/CheckoutSuccessPage"; // Dosya yolunu kontrol edin
import ContactPage from "./Pages/ContactPage";

import "./style.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <CartProvider>
      <Router>
      <Layout>
        <SearchBar />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
            <Route path="/contact" element={<ContactPage />} /> 
          </Routes>
        </main>
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;

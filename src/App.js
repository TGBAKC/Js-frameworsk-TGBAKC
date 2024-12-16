import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./CartContext/CartContext";
import Header from "./Header/Header";
import SearchBar from "./SearchBar/SearchBar";
import Homepage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CheckoutPage from "./Pages/CheckoutPage";
import CheckoutSuccessPage from "./Pages/CheckoutSuccessPage"; // Dosya yolunu kontrol edin
import ContactPage from "./Pages/ContactPage";
import Footer from "./Footer/Footer";
import "./style.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
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
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;

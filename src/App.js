import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./CartContext";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Homepage from "./HomePage";
import ProductPage from "./ProductPage";
import CheckoutPage from "./CheckoutPage";
import CheckoutSuccessPage from "./CheckoutSuccessPage"; // Dosya yolunu kontrol edin
import ContactPage from "./ContactPage";
import Footer from "./Footer";
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

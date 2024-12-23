import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";

const Header = () => {
  const { cart } = useCart();

  return (
    <header>
    <Link to="/">
        <h1>My Shop</h1>
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/checkout">
          <i className="fas fa-shopping-cart"></i> Cart ({cart.length})
        </Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;

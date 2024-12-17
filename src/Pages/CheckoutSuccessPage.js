import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext/CartContext";

const CheckoutSuccessPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Orde Successful!</h1>
      <p>Your order has been placed successfully. Thank you for shopping with us!</p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Back to Store
      </Link>
    </div>
  );
};

export default CheckoutSuccessPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // Toplam fiyatı hesaplama
  const totalPrice = cart.reduce(
    (total, item) => total + item.discountedPrice,
    0
  );

  // Sepet boşsa mesaj göster
  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Checkout</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {cart.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>{item.title}</h2>
              <p style={{ margin: "5px 0" }}>Price: ${item.discountedPrice}</p>
            </div>
            <img
              src={item.image.url}
              alt={item.image.alt || item.title}
              style={{ maxWidth: "100px", borderRadius: "8px" }}
            />
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          padding: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/checkout-success")} // Başarı sayfasına yönlendirme
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext";
import './style.css'; // Eğer aynı dizindeyse



const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
        const result = await response.json();
        if (result.data) {
          setProduct(result.data);
        } else {
          throw new Error("No product data found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-page">
      {product.image && product.image.url ? (
        <img src={product.image.url} alt={product.image.alt || product.title} />
      ) : (
        <p>No image available</p>
      )}
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>
        Price: <strong>${product.discountedPrice}</strong>
        {product.price > product.discountedPrice && (
          <span> ({Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% off)</span>
        )}
      </p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";



const Homepage = () => {
  const [products, setProducts] = useState([]); // Original product list

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://v2.api.noroff.dev/online-shop");
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setProducts(data.data); // Set fetched products
        
          

        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products.length) {
    return <p>Loading products or none available...</p>;
  }

  return (
    <div>
      <h1>Our Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.title}</h2>
            <img
              src={product.image.url}
              alt={product.image.alt || product.title}
              style={{ width: "200px" }}
            />
            <p>{product.description}</p>
            <p>
              Price: <strong>${product.discountedPrice}</strong> (Original Price: ${product.price})
            </p>
            {/* View Product Button */}
            <Link to={`/product/${product.id}`} className="view-product-button">
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;

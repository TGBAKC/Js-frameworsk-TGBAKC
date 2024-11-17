import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link bileşenini ekleyin

const Homepage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://v2.api.noroff.dev/online-shop");
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("Beklenmeyen veri formatı:", data);
        }
      } catch (error) {
        console.error("API'den ürünler alınırken hata oluştu:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products.length) {
    return <p>Ürünler yükleniyor veya bulunamadı.</p>;
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
              Fiyat: <strong>${product.discountedPrice}</strong> (Normal Fiyat: ${product.price})
            </p>
           
            {/* View Product bağlantısı */}
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

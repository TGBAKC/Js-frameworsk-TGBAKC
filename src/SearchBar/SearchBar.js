import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style.css";

const SearchBar = () => {
  const [products, setProducts] = useState([]); // All products from API
  const [searchInput, setSearchInput] = useState(""); // Input value
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Filtered suggestions
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch("https://v2.api.noroff.dev/online-shop");

        if (!response.ok) {
          throw new Error("Error fetching products");
        }

        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setProducts(data.data); 
        } else {
          console.error("Unexpected data format:", data);
          setProducts([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);

    // Filter suggestions dynamically
    if (query.trim().length > 0) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = () => {
    setSearchInput(""); // Clear the search input
    setFilteredSuggestions([]); // Clear suggestions
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search initiated with query:", searchInput);

    // Clear search bar and suggestions after submit
    setSearchInput("");
    setFilteredSuggestions([]);
  };

  if (isLoading) return <div>Loading products...</div>;
  if (isError) return <div>Error fetching products.</div>;

  return (
    <div className="search-bar-container">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="search-bar-form">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍
        </button>
      </form>

      {/* Suggestions */}
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((product) => (
            <li key={product.id} className="suggestion-item">
              <Link to={`/product/${product.id}`} onClick={handleSuggestionClick}>
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

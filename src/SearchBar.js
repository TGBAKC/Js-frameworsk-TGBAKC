import React, { useState, useEffect } from "react";

const url = "https://v2.api.noroff.dev/online-shop";

function SearchBar() {
  const [products, setProducts] = useState([]); 
  const [searchInput, setSearchInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Veri çekme hatası!");
        }

        const data = await response.json();

        console.log("API'den gelen veri:", data); // Burada gelen veriyi kontrol et

        if (Array.isArray(data)) {
          setProducts(data); // `data` bir dizi ise `products` state'ine kaydet
        } else {
          console.error("API'den beklenen formatta bir dizi gelmedi.");
          setProducts([]); // Beklenen formatta değilse products'ı boş dizi olarak ayarla
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Ürünler çekilirken hata oluştu:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchInput(query);

    if (query.length > 0) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Arama yapıldı:", searchInput);
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="input-group">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="s"
          placeholder="Søk"
          data-all-text="Vis alle resultater"
          className="form-control form-search-control"
          autoComplete="off"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-btn">
          <i className="fa fa-search"></i>
        </button>
      </form>
      {/* Öneri listesi */}
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions">
          {filteredSuggestions.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;

import { useState, useEffect } from "react";
import Header from "./components/Header/header";
import Footer from "./components/Footer/Footer";
import ContentBlock from "./components/Shop/ContentBlock";
import Shop from "./components/Shop/ShopPage";
import Cart from "./components/Cart/Cart";
import productsData from "../src/data/products.json";

import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("shop");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const addToCart = (id) => {
    setCart((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) {
        return prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p));
      } else {
        return [...prev, { id, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const incrementQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  return (
    <div>
      <Header
        favoritesCount={favorites.length}
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        onNavigate={setCurrentPage}
      />

      <ContentBlock currentPage={currentPage} onNavigate={setCurrentPage} />

      {currentPage === "shop" && (
        <Shop
          products={productsData.products}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          addToCart={addToCart}
        />
      )}

      {currentPage === "cart" && (
        <Cart
          products={productsData.products}
          cart={cart}
          removeFromCart={removeFromCart}
          incrementQty={incrementQty}
          decrementQty={decrementQty}
        />
      )}

      <Footer />
    </div>
  );
}

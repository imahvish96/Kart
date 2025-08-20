import React from "react";
import "./Header.css";
import { FaCartShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../zustand/store";

function Header() {
  const navigate = useNavigate();
  const cartItems = useStore((state) => state.cartItems);
  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo">ShopEasy</div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for products..."
              className="search-input"
            />
            <button className="search-button">
              <FaSearch fontSize={18} />
            </button>
          </div>
        </div>
        <div className="cart-icon" onClick={() => navigate("/cart")}>
          <FaCartShopping fontSize={24} />
          <span className="cart-badge">{cartItems.length}</span>
        </div>
      </header>
    </>
  );
}

export default Header;

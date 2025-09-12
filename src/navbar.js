import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, Routes, Route } from "react-router-dom"
import "./App.css";

export default function Navbar({ siteName, totalQty, Home, Cart }) {
  return (
  <>
    <div className="topbar">
      <h3 className="site-title">
        <Link to="/" className="text-decoration-none">
          {siteName}
        </Link>
      </h3>

      <div className="cart-info">
        <Link to="/cart" className="text-decoration-none">
          <FontAwesomeIcon icon={faShoppingCart} />
          <small className="items-text">{totalQty()} items</small>
        </Link>
      </div>
    </div>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </>
);
}

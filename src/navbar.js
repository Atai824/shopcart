// src/navbar.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./App.css";

export default function Navbar({ siteName, totalQty }) {
  return (
    <div className="topbar">
      <h3 className="site-title">
        <Link to="/" className="text-decoration-none">
          Shop 2 <span className="react-badge">R</span>eact
        </Link>
      </h3>

      <div className="cart-info">
        <Link to="/cart" className="text-decoration-none">
          <FontAwesomeIcon icon={faShoppingCart} />
          <small className="items-text">{totalQty()} items</small>
        </Link>
      </div>
    </div>
  );
}

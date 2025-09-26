import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Cart from "./cart";
import SignIn from "./signin";
import Checkout from "./checkout";
import Navbar from "./navbar";
import DisplayProducts from "./displayProducts";
import { productsData } from "./products";

/* Parent */
class App extends React.Component {
  state = {
    siteName: "Shop 2 React",
    products: productsData,
    isAuthed: false,
  };

  handleAuthSuccess = () => this.setState({ isAuthed: true });

  // total with map
  totalQty = () =>
    this.state.products.map((p) => p.qty).reduce((a, b) => a + b, 0);

  handleQtyChange = (id, qty) => {
    this.setState(({ products }) => ({
      products: products.map((p) => (p.id === id ? { ...p, qty } : p)),
    }));
  };

  handleAdd = (id) => {
    this.setState(({ products }) => ({
      products: products.map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      ),
    }));
  };

  handleSub = (id) => {
    this.setState(({ products }) => ({
      products: products.map((p) =>
        p.id === id ? { ...p, qty: Math.max(0, p.qty - 1) } : p
      ),
    }));
  };

  render() {
    const { siteName, products, isAuthed } = this.state;

    const Home = () => (
      <DisplayProducts
        products={products}
        onQtyChange={this.handleQtyChange}
        onAdd={this.handleAdd}
        onSub={this.handleSub}
      />
    );

    return (
      <BrowserRouter>
        <Container className="py-4">
          {/* В Navbar НЕ передаём Home/Cart */}
          <Navbar siteName={siteName} totalQty={this.totalQty} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={<Cart products={products} totalQty={this.totalQty} />}
            />
            <Route
              path="/signin"
              element={<SignIn onSuccess={this.handleAuthSuccess} />}
            />
            <Route
              path="/checkout"
              element={isAuthed ? <Checkout /> : <Navigate to="/signin" />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;

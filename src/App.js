import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Cart from "./cart";

import Navbar from "./navbar";
import DisplayProducts from "./displayProducts";
import { productsData } from "./products";

/* Parent */
class App extends React.Component {
  state = {
    siteName: "Shop 2 React",
    products: productsData,
  };

//total with map//
totalQty = () =>
  this.state.products.map(p => p.qty).reduce((a, b) => a + b, 0);

handleQtyChange = (id, qty) => {
    this.setState(({ products }) => ({
      products: products.map(p => (p.id === id ? { ...p, qty } : p)),
    }));
  };
  handleAdd = (id) => {
    this.setState(({ products }) => ({
      products: products.map(p =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      ),
    }));
  };

  handleSub = (id) => {
    this.setState(({ products }) => ({
      products: products.map(p =>
        p.id === id ? { ...p, qty: Math.max(0, p.qty - 1) } : p
      ),
    }));
  };

  render() {
    const { siteName, products } = this.state;
    const Home = () => (
      <DisplayProducts
      products={products}
      onQtyChange={this.handleQtyChange}
      onAdd={this.handleAdd}
      onSub={this.handleSub}
      />
    );
    const CartPage = () => <Cart products={products} />;

    return (
      <BrowserRouter>
      <Container className="py-4">
        <Navbar siteName={siteName} totalQty={this.totalQty} Home={Home} Cart={CartPage} />
      </Container>
      </BrowserRouter>
    );
  }
}

export default App;
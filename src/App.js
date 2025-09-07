import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

/* Child Component */
function ProductRow({ product, onQtyChange }) {
  const handleChange = (e) => {
    const val = Number(e.target.value);
    onQtyChange(product.id, Number.isNaN(val) || val < 0 ? 0 : val);
  };

  return (
    <div className="product-row">
      {/*Name*/}
      <Row>
        <Col>
          <h5 className="product-title">{product.name}</h5>
        </Col>
      </Row>
      {/*image and Qty*/}
      <Row className="align-items-center">
        <Col md="2" sm="3" xs="4" className="text-center">
          <img src={product.image} alt={product.name} className="product-img"></img>
        </Col>
        
        <Col md="7" sm="6" xs="8" className="qty-col">
          <Form>
            <input
              type="number"
              min="0"
              className="form-control qty-input"
              value={product.qty}
              onChange={handleChange}>
              </input>
          </Form>
          <span className="qty-label">quantity</span>
       </Col>
      </Row>
    </div>
  );
}

/*Parent*/
class App extends React.Component {
  state = {
    siteName: "Shop to React",
    products: [
      { id: 1, name: "Unisex Cologne", image: "/products/cologne.jpg", qty: 0 },
      { id: 2, name: "Apple Watch", image: "/products/iwatch.jpg", qty: 0 },
      { id: 3, name: "Unique Mug", image: "/products/mug.jpg", qty: 0 },
      { id: 4, name: "Mens Wallet", image: "/products/wallet.jpg", qty: 0 },
    ],
  };

//total with map//
totalQty = () =>
  this.state.products.map(p => p.qty).reduce((a, b) => a + b, 0);

handleQtyChange = (id, qty) => {
    this.setState(({ products }) => ({
      products: products.map(p => (p.id === id ? { ...p, qty } : p)),
    }));
  };

  render() {
    const { siteName, products } = this.state;

    return (
      <Container className="py-4">

        <div className="topbar">
          <h3 className="site-title">{siteName}</h3>
          <div className="cart-info">
            <FontAwesomeIcon icon={faShoppingCart} />
            <small className="items-text">{this.totalQty()} items</small>
          </div>
        </div>


        <div className="box">
          {products.map(p => (
            <ProductRow
              key={p.id}
              product={p}
              onQtyChange={this.handleQtyChange}
            />
          ))}
        </div>
      </Container>
    );
  }
}

export default App;
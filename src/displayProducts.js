// src/displayProducts.js
import React, { useState } from "react";
import { Row, Col, Form, Button } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function ProductRow({ product, onQtyChange, onOpen, onAdd, onSub }) {
  const handleChange = (e) => {
    const val = Number(e.target.value);
    onQtyChange(product.id, Number.isNaN(val) || val < 0 ? 0 : val);
  };

  return (
    <div className="product-row">
      {/* Name */}
      <Row>
        <Col>
          <h5 className="product-title">{product.name}</h5>
        </Col>
      </Row>

      {/* Image and Qty */}
      <Row className="align-items-center">
        <Col md="2" sm="3" xs="4" className="text-center">
          <img
            src={product.image}
            alt={product.name}
            className="product-img"
            style={{ cursor: "pointer" }}
            onClick={() => onOpen(product)} 
          />
        </Col>

        <Col md="7" sm="6" xs="8" className="qty-col">
          <div className="qty-controls">
            <button
                type="button"
                className="btn qty-btn"
                onClick={() => onAdd(product.id)}
                aria-label="add"
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>

            <button
                type="button"
                className="btn qty-btn"
                onClick={() => onSub(product.id)}
                aria-label="subtract"
            >
                <FontAwesomeIcon icon={faMinus} />
            </button>

            <div className="qty-field">
            <span className="qty-label">Quantity</span>
          
            <div className="qty-box" aria-label={`Quantity ${product.qty}`}>
                {product.qty}
            </div>
            </div>

            </div>


        </Col>
      </Row>
    </div>
  );
}

export default function DisplayProducts({ products, onQtyChange, onAdd, onSub }) {
  // состояние модалки и активного товара
  const [show, setShow] = useState(false);
  const [showImge, setShowImge] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setShow(true);
    setShowImge(product);
  };

  return (
    <>
      <div className="box">
        {products.map((p) => (
          <ProductRow
            key={p.id}
            product={p}
            onQtyChange={onQtyChange}
            onOpen={handleShow}
            onAdd={onAdd}
            onSub={onSub}
          />
        ))}
      </div>

      {/* Modal (после .map, внутри return) */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>{showImge.desc}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img
            src={showImge.image}
            width="350"
            alt={showImge.desc}
            className="mx-5"
            />
            <p>
            <span className="text-dark">Ratings:</span> {showImge.ratings}/5
            </p>
        </Modal.Body>
        </Modal>

    </>
  );
}

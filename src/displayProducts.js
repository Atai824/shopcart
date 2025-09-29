// src/displayProducts.js
import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function ProductRow({ product, onQtyChange, onOpen, onAdd, onSub }) {
  return (
    <div className="product-row">
     
      {/* Название + цена одной строкой слева */}
        <Row>
          <Col xs="12">
            <h5 className="product-title mb-2">
              {product.name} <small className="product-price">${product.price}</small>
            </h5>
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
              <span className="btn-glyph">
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button>

            <button
              type="button"
              className="btn qty-btn"
              onClick={() => onSub(product.id)}
              aria-label="subtract"
            >
              <span className="btn-glyph">
                <FontAwesomeIcon icon={faMinus} />
              </span>
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
  // modal
  const [show, setShow] = useState(false);
  const [showImge, setShowImge] = useState({});

 
  // "normal" — как в слайде: дефолтная раскладка по id по возрастанию
  const [sortBy, setSortBy] = useState("normal");

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setShow(true);
    setShowImge(product);
  };

  // вычисляем отсортированный список для отображения
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "lowest":
        return a.price - b.price;
      case "highest":
        return b.price - a.price;
      default: // "normal"
        return a.id - b.id;
    }
  });


  return (
    <>
      {/* Панель сортировки как на макете */}
      

      <div className="box">
        <div className="box-header sortbar d-flex justify-content-center align-items-center mt-4">
        <span className="me-2 small text-muted">Sort Price By:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="form-select form-select-sm sort-select"
          aria-label="Sort Price By"
          style={{ width: 70 }}
        >
          <option value="normal">Normal</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
        {sortedProducts.map((p) => (
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

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{showImge.desc}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={showImge.image} width="350" alt={showImge.desc} className="mx-5" />
          <p className="mt-3">
            <span className="text-dark">Ratings:</span> {showImge.ratings}/5
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

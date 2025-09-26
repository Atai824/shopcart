import React from "react";
import { Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Cart({ products }) {
    const navigate = useNavigate();
    const items = products.filter(p => p.qty > 0);
    if (items.length === 0) return <p className="p-3">Your cart is empty.</p>;

    return (
        <>
        <div className="box">
            {items.map(p => (
                <div className="product-row" key={p.id}>
                    <Row className="align-items-center">
                        <Col md="2" sm="3" xs="4" className="text-center">
                        <img src={p.image} alt={p.name} className="product-img" />
                        </Col>
                        <Col md="10" sm="9" xs="8">
                        <h5 className="product-title mb-1">{p.name}</h5>
                        <div className="text-muted">Qty: {p.qty}</div>
                        </Col>
                    </Row>
                </div>
            ))}
        </div>
            <div className="cart actions">
                <Button color="primary" onClick={() => navigate("/signin")}>
                    Check Out
                </Button>
            </div>
            </>
    );
}
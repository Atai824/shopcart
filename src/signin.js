// src/signin.jsx
import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

export default function SignIn({ onSuccess }) {
  const navigate = useNavigate();

  const handleClassicLogin = (e) => {
    e.preventDefault();
    onSuccess();
    navigate("/checkout");
  };

  const handleFacebookLogin = () => {
    onSuccess();
    navigate("/checkout");
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-panel">
        <div className="signin-panel__header">Sign In</div>

        <div className="signin-panel__body">
          <p className="text-muted mb-3">
            Please login using one of the following:
          </p>

          <div className="signin-content">
            <Form onSubmit={handleClassicLogin} className="signin-card">
              <FormGroup className="mb-2">
                <Label htmlFor="name" className="mb-1">Name:</Label>
                <Input id="name" placeholder="Your name" />
              </FormGroup>

              <FormGroup className="mb-2">
                <Label htmlFor="email" className="mb-1">Email:</Label>
                <Input id="email" type="email" placeholder="Your Email" />
              </FormGroup>

              <Button color="success" size="sm" type="submit">
                Login
              </Button>
            </Form>
          </div>

          <Button className="btn-facebook mt-3" onClick={handleFacebookLogin}>
            <FontAwesomeIcon icon={faFacebookF} className="me-2" />
            LOGIN WITH FACEBOOK
          </Button>
        </div>
      </div>
    </div>
  );
}

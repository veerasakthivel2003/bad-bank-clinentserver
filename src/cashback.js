import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Withdraw() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const api = "http://localhost:1234";

  useEffect(() => {
    validateForm();
  }, [email, password, withdrawAmount]);

  const validateForm = () => {
    const amount = parseFloat(withdrawAmount);
    setIsValid(email.trim() !== "" && password.trim() !== "" && !isNaN(amount) && amount > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountToWithdraw = parseFloat(withdrawAmount);
    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
    }
    try {
      const response = await axios.post(`${api}/data/withdraw`, {
        email,
        password, // Ensure password is sent if authentication is required
        amount: amountToWithdraw,
      });
      setSuccessMessage(`Successfully withdrawn $${amountToWithdraw}. Your new balance is $${response.data.newBalance}.`);
      setWithdrawAmount("");
      setIsValid(false);
    } catch (error) {
      alert(error.response?.data?.message || "Withdrawal failed. Please try again.");
    }
  };

  return (
    <div className="background">
      <h1 className="register-heading">Withdraw</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <Form className="custom-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 custom-form-group">
          <Form.Label className="custom-label">Email address</Form.Label>
          <Form.Control
            className="custom-input"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 custom-form-group">
          <Form.Label className="custom-label">Password</Form.Label>
          <Form.Control
            className="custom-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 custom-form-group">
          <Form.Label className="custom-label">Amount</Form.Label>
          <Form.Control
            className="custom-input"
            type="number"
            placeholder="Enter withdrawal amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
        </Form.Group>
        <Button className="custom-button" variant="primary" type="submit" disabled={!isValid}>
          Withdraw
        </Button>
      </Form>
    </div>
  );
}



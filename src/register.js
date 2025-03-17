import React, { useState } from "react";
import axios from "axios";
import "./register.css"; // Import the new CSS file

export default function Register() {
  let [Name, setName] = useState("");
  let [Email, setEmail] = useState("");
  let [pass, setPass] = useState("");
  const api ="http://localhost:1234";
  function handleSubmit(e) {
    e.preventDefault();
    let item = [{ name: Name, email: Email, password: pass, amount: 1000 }];
    axios.post(`${api}/create, item`);
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
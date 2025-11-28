import React, { useState } from "react";
import axios from "axios";

function AddCustomer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const saveData = (e) => {
    e.preventDefault();

    axios.post("http://localhost:7178/api/Customer", {
      Name: name,
      Email: email,
      Phone: phone
    })
    .then(response => {
      console.log("Customer Saved Successfully");
      
      setName("");
      setEmail("");
      setPhone("");
    })
    .catch(error => {
      console.error("Request failed:", error.message);
    });
  };

  return (
    <div className="fb">
      <form onSubmit={saveData}>
        <h1>Add Customer</h1><br />

        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <br />

        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <br />

        <label htmlFor="phone">Phone</label>
        <input 
          type="text" 
          id="phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required 
        />
        <br />

        <center>
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
        </center>
      </form>
    </div>
  );
}

export default AddCustomer

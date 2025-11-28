import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function AddRoom() {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Available");

  const saveData = (e) => {
    e.preventDefault();

    axios.post("http://localhost:7178/api/Room", {
      RoomNumber: number,   
      Type: type,
      Price: price,
      Status: status
    })
    .then(response => {
      console.log("Room Saved Successfully");
      
      setNumber("");
      setType("");
      setPrice("");
      setStatus("Available");
    })
    .catch(error => {
      console.error("Request failed:", error.message);
    });
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow mb-4" style={{ width: "80vw", maxWidth: "600px" }}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">➕ Add New Room</h5>
        </div>
        <div className="card-body p-4">
          <form onSubmit={saveData}>
            <div className="mb-3">
              <label className="form-label">Room Number</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter room number"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Room Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Standard"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-select"
              required/>
                
            </div>

            <button type="submit" className="btn btn-success w-100">
              ✅ Add Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRoom

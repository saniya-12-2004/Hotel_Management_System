import React, { useState, useEffect } from "react";
import axios from "axios";

function BookingPage() {
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    customerId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    status: "Confirmed"
  });

  
  useEffect(() => {
    axios.get("http://localhost:7178/api/Customer")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Failed to fetch customers:", err.message));

    axios.get("http://localhost:7178/api/Room")
      .then((res) => setRooms(res.data))
      .catch((err) => console.error("Failed to fetch rooms:", err.message));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveBooking = (e) => {
    e.preventDefault();

    axios.post("http://localhost:7178/api/Booking", {
      customerId: formData.customerId,
      roomId: formData.roomId,
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      status: formData.status
    })
    .then(() => {
      alert("Booking saved successfully!");
      setFormData({
        customerId: "",
        roomId: "",
        checkInDate: "",
        checkOutDate: "",
        status: "Confirmed"
      });
    })
    .catch((error) => {
      console.error("Request failed:", error.message);
      alert("Room already booked");
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow mb-4 mx-auto" style={{ width: "80vw", maxWidth: "600px" }}>
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">📅 New Booking</h5>
        </div>
        <div className="card-body p-4">
          <form onSubmit={saveBooking}>
           
            <div className="mb-3">
              <label className="form-label">Customer</label>
              <select
                className="form-select"
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Customer --</option>
                {customers.map((c) => (
                  <option key={c.customerId} value={c.customerId}>
                    {c.name} ({c.email})
                  </option>
                ))}
              </select>
            </div>

            
            <div className="mb-3">
              <label className="form-label">Room</label>
              <select
                className="form-select"
                name="roomId"
                value={formData.roomId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Room --</option>
                {rooms.map((r) => (
                  <option key={r.roomId} value={r.roomId}>
                    Room {r.roomNumber} - {r.type} (₹{r.price})
                  </option>
                ))}
              </select>
            </div>

            
            <div className="mb-3">
              <label className="form-label">Check-In Date</label>
              <input
                type="date"
                className="form-control"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Check-Out Date</label>
              <input
                type="date"
                className="form-control"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
                required
              />
            </div>

           
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Confirmed">Confirmed ✅</option>
                <option value="Cancelled">Cancelled ❌</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingPage

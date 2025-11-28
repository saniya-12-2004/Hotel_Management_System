import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function EditRoom() {
  const { id } = useParams();       
  const navigate = useNavigate();

  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Available");

  
  useEffect(() => {
    axios.get(`http://localhost:7178/api/Room/${id}`)
      .then((response) => {
        const r = response.data;
        setRoomNumber(r.roomNumber);
        setType(r.type);
        setPrice(r.price);
        setStatus(r.status);
      })
      .catch(error => console.error("Request failed:", error.message));
  }, [id]);

  
  const saveData = (e) => {
    e.preventDefault();

    const updatedRoom = {
      roomId: id,          
      roomNumber,
      type,
      price,
      status
    };

    axios.put(`http://localhost:7178/api/Room/${id}`, updatedRoom)
      .then(() => {
        alert("Room updated successfully!");
        navigate("/roomlist");   
      })
      .catch(error => console.error("Update failed:", error.message));
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow mb-4" style={{ width: "80vw", maxWidth: "600px" }}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">✏️ Edit Room</h5>
        </div>
        <div className="card-body p-4">
          <form onSubmit={saveData}>
            <div className="mb-3">
              <label className="form-label">Room Number</label>
              <input
                type="text"
                className="form-control"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Type</label>
              <input
                type="text"
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Available">Available ✅</option>
                <option value="Booked">Booked ❌</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRoom

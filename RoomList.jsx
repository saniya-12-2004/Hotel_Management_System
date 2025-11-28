import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";  

function RoomList() {
  const [rooms, setRooms] = useState([]);

 
  useEffect(() => {
    axios.get("http://localhost:7178/api/Room")
      .then((response) => setRooms(response.data))
      .catch(error => console.error("Failed to fetch rooms:", error.message));
  }, []);

 
  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`http://localhost:7178/api/Room/${roomId}`);
      setRooms((prev) => prev.filter((r) => r.roomId !== roomId));
      alert("Room deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error.message);
      alert("Error deleting room");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-end" style={{ minHeight: "50vh" }}>
      <div className="card shadow mb-4 mx-auto" style={{ width: "80vw", maxWidth: "1000px" }}>
        <div className="card-header bg-secondary text-white">
          <h6 className="mb-0">📋 Rooms List</h6>
        </div>
        <div className="card-body">
          <table className="table table-sm table-striped table-hover w-100">
            <thead className="table-dark">
              <tr>
                <th>Room No</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length > 0 ? (
                rooms.map((room) => (
                  <tr key={room.roomId}>
                    <td>{room.roomNumber}</td>
                    <td>{room.type}</td>
                    <td>₹{room.price}</td>
                    <td>
                      <span className={`badge ${room.status === "Booked" ? "bg-danger" : "bg-success"}`}>
                        {room.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                       
                        <Link to={`/editroom/${room.roomId}`}>
                          <button className="btn btn-sm btn-primary me-2">✏️ Edit</button>
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(room.roomId)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No rooms available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RoomList

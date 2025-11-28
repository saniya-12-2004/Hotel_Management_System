import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  
  useEffect(() => {
    axios.get("http://localhost:7178/api/Customer")
      .then((response) => setCustomers(response.data))
      .catch(error => console.error("Failed to fetch customers:", error.message));
  }, []);

  return (
    <div className="d-flex flex-column justify-content-end" style={{ minHeight: "50vh" }}>
      <div className="card shadow mb-4 mx-auto" style={{ width: "80vw", maxWidth: "1000px" }}>
        <div className="card-header bg-secondary text-white">
          <h6 className="mb-0">📋 Customers List</h6>
        </div>
        <div className="card-body">
          <table className="table table-sm table-striped table-hover w-100">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((c) => (
                  <tr key={c.customerId}>
                    <td>{c.customerId}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No customers available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerList

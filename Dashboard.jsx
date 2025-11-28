import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    booked: 0,
    available: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
       
        const response = await axios.get("http://localhost:7178/api/Room");

        const rooms = response.data;
        console.log("Rooms data:", rooms); 

        const total = rooms.length;

        const booked = rooms.filter(r => {
          if (typeof r.status === "string") {
            const val = r.status.toLowerCase();
            return val === "booked" || val === "occupied" || val === "reserved";
          }
          if (typeof r.isBooked === "boolean") {
            return r.isBooked === true;
          }
          return false;
        }).length;

        const available = total - booked;

        setStats({ total, booked, available });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
   <div 
      className="container d-flex flex-column justify-content-end" 
      style={{ minHeight: "50vh" }}
    >
      <div>
        <h2 className="text-center mb-4">🏨 Hotel Management Dashboard</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card text-white bg-primary mb-3 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">Total Rooms</h5>
                <h2>{stats.total}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-danger mb-3 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">Booked Rooms</h5>
                <h2>{stats.booked}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">Available Rooms</h5>
                <h2>{stats.available}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard

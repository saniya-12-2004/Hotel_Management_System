import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Components/AddCustomer.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Components/Dashboard';
import AddRoom from './Components/AddRoom';
import RoomList from './Components/RoomList';
import EditRoom from './Components/EditRoom';
import AddCustomer from './Components/AddCustomer';
import CustomerList from './Components/CustomerList';
import BookingPage from './Components/BookingPage';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        
<div className="nav-links d-flex flex-wrap flex-md-row justify-content-start">
  <Link to="/" className="btn btn-outline-primary m-2">Home</Link>
  <Link to="/addroom" className="btn btn-outline-primary m-2">Add Room</Link>
  <Link to="/roomlist" className="btn btn-outline-primary m-2">Room List</Link>
  <Link to="/addcustomer" className="btn btn-outline-primary m-2">Add Customer</Link>
  <Link to="/customerlist" className="btn btn-outline-primary m-2">Customer List</Link>
  <Link to="/booking" className="btn btn-outline-primary m-2">Booking</Link>
</div>

        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addroom" element={<AddRoom />} />
          <Route path="/roomlist" element={<RoomList />} />
          <Route path="/addcustomer" element={<AddCustomer />} />
          <Route path="/customerlist" element={<CustomerList />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/editroom/:id" element={<EditRoom />} /> {/* ✅ moved inside Routes */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

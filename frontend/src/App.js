import React from "react";
import { BrowserRouter, Routes, Route, Link , Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid bg-dark text-white py-2">
   <h3 className=" text-center">User Details</h3>
      
         <nav className="navbar navbar-dark bg-dark px-3">
          

        <Link className="navbar-brand"  to="/register"></Link>
        <div>
          
          <Link className="btn btn-outline-light me-2" to="/register">Register</Link>
          <Link className="btn btn-outline-light" to="/login">Login</Link>
        </div>
      </nav>
</div>
      
    
      <div className="container mt-4">
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

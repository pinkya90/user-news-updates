import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

   const [error, setError] = useState("");
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    if (data.status === "success") {
      navigate("/dashboard",{
        state: { name: data.name }}); // ✅ Auto redirect
    } else {
    alert(data.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card shadow">
          <div className="card-body">
            <h3 className="text-center mb-3">Login</h3>

 {error && <div className="alert alert-danger">{error}</div>}
 
            <form onSubmit={handleSubmit}>
              <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} required />
              <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} required />

              <button className="btn btn-success w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

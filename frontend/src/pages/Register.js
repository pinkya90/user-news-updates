import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });

  const [error, setError] = useState("");
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (form.name.length < 3) return "Name must be at least 3 characters";
    if (!form.email.includes("@")) return "Invalid email address";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (!/^[0-9]{10}$/.test(form.mobile)) return "Mobile must be 10 digits";
    return "";
  };

  const handleSubmit = async e => {
    e.preventDefault();

     const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    if (data.status === "success") {
      alert("Registered successfully");
      navigate("/login"); // ✅ Auto redirect
    } else {
    alert(data.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card shadow">
          <div className="card-body">
            <h3 className="text-center mb-3">Register</h3>

             {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <input className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange} required />
              <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} required />
              <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} required />
              <input className="form-control mb-3" name="mobile" placeholder="Mobile" onChange={handleChange} required />

              <button className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

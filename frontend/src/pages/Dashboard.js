import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {

const location = useLocation();
  const navigate = useNavigate();

    const name = location.state?.name;

  // Safety check (user opens dashboard directly)
  if (!name) {
    navigate("/login");
    return null;
  }
  return (
    <div className="text-center">
      <h2>Welcome {name}🎉</h2>
      <p>You have logged in successfully</p>
    </div>
  );
}

export default Dashboard;

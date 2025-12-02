import React from "react";

const Dashboard = () => {
  const userName = localStorage.getItem("userName");

  return (
    <div className="page-header">
      <h1>Welcome {userName}</h1>
      <h2>SmartPath Dashboard</h2>

      <button onClick={() => (window.location.href = "/createTeam")}>
        Create Team
      </button>
      <button onClick={() => (window.location.href = "/createProject")}>
        Create Project
      </button>
    </div>
  );
};

export default Dashboard;

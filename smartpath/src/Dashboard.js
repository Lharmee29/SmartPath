import React from "react";

const Dashboard = () => {
  const fullName = localStorage.getItem("userFullName") || "User";
  const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/Login";
};

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h1>Welcome, {fullName}!</h1>

  <button
    onClick={handleLogout}
    style={{
      padding: "10px 20px",
      backgroundColor: "#d9534f",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Sign Out
  </button>
</div>

      <div style={{ marginTop: "30px" }}>
        <button onClick={() => (window.location.href = "/CreatePlan")}
          style={{ padding: "15px 25px", margin: "10px" }}>
          Create Plan
        </button>

        <button onClick={() => (window.location.href = "/ViewPlans")}
          style={{ padding: "15px 25px", margin: "10px" }}>
          View My Plans
        </button>

        <button onClick={() => (window.location.href = "/CommunityPlans")}
          style={{ padding: "15px 25px", margin: "10px" }}>
          Community Plans
        </button>

       <button onClick={() => (window.location.href = "/ViewPlans")}
       style={{ padding: "15px 25px", margin: "10px" }}>
          Advisor Feedback
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

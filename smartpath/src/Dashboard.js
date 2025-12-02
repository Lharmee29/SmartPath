import React from "react";

const Dashboard = () => {
  const fullName = localStorage.getItem("userFullName") || "User";

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome, {fullName}!</h1>

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

        <button onClick={() => (window.location.href = "/AdvisorFeedback")}
          style={{ padding: "15px 25px", margin: "10px" }}>
          Advisor Feedback
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

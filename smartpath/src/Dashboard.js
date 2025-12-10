import React from "react";

const Dashboard = () => {
  const fullName = localStorage.getItem("userFullName") || "User";
  const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/Login";
};

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 class="page-header">Welcome, {fullName}!</h1>
      <div class="dashboard-ctr">
      <div style={{ marginTop: "30px" }}>
              <button onClick={() => (window.location.href = "/CreatePlan")}
                class="dashboard-btn">
                Create Plan
              </button>

              <button onClick={() => (window.location.href = "/ViewPlans")}
                class="dashboard-btn">
                View My Plans
              </button>

              <button onClick={() => (window.location.href = "/CommunityPlans")}
                class="dashboard-btn">
                Community Plans
              </button>

            <button onClick={() => (window.location.href = "/AdvisorFeedback")}
                class="dashboard-btn">
                Advisor Feedback
              </button>
            </div>
    </div> <br />
      <button class="signout-btn" onClick={handleLogout} >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;

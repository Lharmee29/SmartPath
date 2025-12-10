import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./default.css";
import axios from "axios";

const PlanDetails = () => {
  const { planId } = useParams(); 

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `http://localhost:9000/getPlan/${planId}`
        );

        setPlan(res.data);
      } catch (err) {
        console.error("Error fetching plan:", err);
        setError("Could not load plan. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (planId) {
      fetchPlan();
    }
  }, [planId]);

  if (loading) {
    return (
      <div className="page-header">
        <h1>Plan Details</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-header">
        <h1>Plan Details</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="page-header">
        <h1>Plan Details</h1>
        <p>No plan found.</p>
      </div>
    );
  }

  return (
    <div className="page-header">
      <h1>Plan Details</h1>

      <div className="box">
        <h2>{plan.name}</h2>
        <p>
          <strong>Owner:</strong>{" "}
          {plan.owner
            ? `${plan.owner.firstName} ${plan.owner.lastName} (${plan.owner.username})`
            : "Unknown"}
        </p>
        <p>
          <strong>Visibility:</strong> {plan.public ? "Public" : "Private"}
        </p>

        {plan.majorName && (
          <>
            <h3>Major: {plan.majorName}</h3>
            <p>
              <strong>Major ID:</strong> {plan.majorId}
            </p>

            <h4>Required Courses</h4>
            {plan.majorCourses && plan.majorCourses.length > 0 ? (
              <ul>
                {plan.majorCourses.map((c, idx) => (
                  <li key={idx}>
                    {c.code} – {c.name} ({c.credits} credits
                    {c.suggestedTerm ? `, ${c.suggestedTerm}` : ""})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No major courses stored.</p>
            )}
          </>
        )}
      </div>
              <div className="box" style={{ marginTop: "20px" }}>
        <h3>Advisor Comments</h3>
        {plan.comments && plan.comments.length > 0 ? (
          <ul>
            {plan.comments.map((c, idx) => (
              <li key={idx} style={{ marginBottom: "8px" }}>
                <strong>{c.authorName || "Advisor"}:</strong>{" "}
                {c.text}{" "}
                <span style={{ fontSize: "0.85em", color: "#666" }}>
                  ({new Date(c.createdAt).toLocaleString()})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No advisor feedback yet.</p>
        )}
           </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => (window.location.href = "/ViewPlans")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Back to My Plans
        </button>

        <button
          onClick={() => (window.location.href = "/Dashboard")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#006bc2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PlanDetails;
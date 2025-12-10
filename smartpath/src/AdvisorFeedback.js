import React, { useEffect, useState } from "react";
import "./default.css";
import axios from "axios";

const AdvisorFeedback = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  const userFullName = localStorage.getItem("userFullName") || "Student";

  useEffect(() => {
    const fetchPlans = async () => {
      if (!userId) {
        setError("You must be logged in to view advisor feedback.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("http://localhost:9000/getUserPlans", {
          params: { userId },
        });

        setPlans(res.data || []);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Could not load your plans. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [userId]);

  if (loading) {
    return (
      <div className="page-header">
        <h1>Advisor Feedback</h1>
        <p>Loading your plans and comments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-header">
        <h1>Advisor Feedback</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-header">
      <h1>Advisor Feedback</h1>
      <p>Welcome, {userFullName}!</p>

      <div className="box">
        {plans.length === 0 ? (
          <p>You don't have any saved plans yet.</p>
        ) : (
          plans.map((plan) => (
            <div
              key={plan._id}
              style={{
                borderBottom: "1px solid #ccc",
                marginBottom: "15px",
                paddingBottom: "10px",
              }}
            >
              <h3>{plan.name}</h3>
              <p>
                <strong>Major:</strong> {plan.majorName || "None selected"}
              </p>

              {plan.comments && plan.comments.length > 0 ? (
                <>
                  <h4>Advisor Comments:</h4>
                  <ul>
                    {plan.comments.map((c, idx) => (
                      <li key={idx}>
                        <strong>{c.authorName || "Advisor"}:</strong>{" "}
                        {c.text}{" "}
                        {c.createdAt && (
                          <span
                            style={{
                              fontSize: "0.85em",
                              color: "#666",
                              marginLeft: "6px",
                            }}
                          >
                            ({new Date(c.createdAt).toLocaleString()})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p style={{ fontStyle: "italic" }}>
                  No advisor comments for this plan yet.
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdvisorFeedback;

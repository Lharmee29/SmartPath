import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./default.css";

const ViewPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("http://localhost:9000/getUserPlans", {
          params: { userId },
        });

        setPlans(res.data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to load your plans.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchPlans();
  }, [userId]);

  if (loading)
    return (
      <div className="page-header">
        <h1>My Plans</h1>
        <p>Loading your plans...</p>
      </div>
    );

  if (error)
    return (
      <div className="page-header">
        <h1>My Plans</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div className="page-header">
      <h1>My Plans</h1>

      <div className="box">
        {plans.length === 0 ? (
          <p>You have no saved plans yet.</p>
        ) : (
          <ul>
            {plans.map((plan) => (
              <li key={plan._id} style={{ marginBottom: "10px" }}>
                <strong>{plan.name}</strong>
                <br />
                Major: {plan.majorName || "None selected"}
                <br />
                <Link to={`/plans/${plan._id}`}>
                  <button>View Plan</button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewPlans;

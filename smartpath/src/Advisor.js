import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./default.css";

function Advisor() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/Login";
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("http://localhost:9000/advisor/getAllPlans");
        if (!res.ok) {
          throw new Error("Failed to load plans");
        }
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error(err);
        setError("Could not load student plans.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="page-header">
        <div className="box">
          <p>Loading student plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-header">
        <div className="box">
          <p style={{ color: "#ff6b6b" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-header" style={{ minHeight: "100vh" }}>
      {/* Top bar with title + sign out */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1000px",
          margin: "0 auto 20px",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "5px", color: "#006bc2" }}>
            Advisor Dashboard
          </h1>
          <p style={{ margin: 0, color: "#555" }}>
            These plans are pulled from students saved in the system.
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Sign Out
        </button>
      </div>

      {/* Main content box */}
      <div
        className="box"
        style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "left" }}
      >
        {plans.length === 0 ? (
          <>
            <p>No student plans found in the system yet.</p>
            <p>Once students create plans, they will show up here.</p>
          </>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "10px",
                    backgroundColor: "#006bc2",
                    color: "white",
                    textAlign: "left",
                  }}
                >
                  Student
                </th>
                <th
                  style={{
                    padding: "10px",
                    backgroundColor: "#006bc2",
                    color: "white",
                    textAlign: "left",
                  }}
                >
                  Plan Name
                </th>
                <th
                  style={{
                    padding: "10px",
                    backgroundColor: "#006bc2",
                    color: "white",
                    textAlign: "left",
                  }}
                >
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan._id}>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {plan.owner?.firstName} {plan.owner?.lastName} (
                    {plan.owner?.username})
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {plan.name || "Untitled plan"}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <Link to={`/advisor/plan/${plan._id}`}>
                     <button
                        style={{
                        padding: "6px 14px",
                        backgroundColor: "white",
                        color: "#006bc2",
                        border: "2px solid white",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                }}
              >    
                View Plan
              </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Advisor;
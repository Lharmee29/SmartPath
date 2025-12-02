import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Advisor() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    return <p style={{ padding: 20 }}>Loading student plans...</p>;
  }

  if (error) {
    return <p style={{ padding: 20 }}>{error}</p>;
  }

  if (plans.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Advisor Dashboard</h1>
        <p>No student plans found in the system yet.</p>
        <p>Once students create plans, they will show up here.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Advisor Dashboard</h1>
      <p>These plans are pulled from students saved in the system.</p>

      <table border="1" cellPadding="8" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Plan Name</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id}>
              <td>
                {plan.owner?.firstName} {plan.owner?.lastName} (
                {plan.owner?.username})
              </td>
              <td>{plan.name || "Untitled plan"}</td>
              <td>
                <Link to={`/advisor/plan/${plan._id}`}>
                  <button>View Plan</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Advisor;

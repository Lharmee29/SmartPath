import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function AdvisorPlans() {
  const { id } = useParams();          // plan id from URL
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const formatSemestersOffered = (semestersOffered) => {
  if (!semestersOffered) return "";

  const offered = Object.entries(semestersOffered)
    .filter(([_, val]) => val)
    .map(([sem]) => sem.charAt(0).toUpperCase() + sem.slice(1));

  return offered.length ? `— Offered: ${offered.join(", ")}` : "";
};

  // Load the plan details
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await fetch(`http://localhost:9000/getPlan/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch plan");
        }
        const data = await res.json();
        setPlan(data);
      } catch (err) {
        console.error(err);
        setError("Could not load this plan.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      setSaving(true);
      setError("");

      const res = await fetch("http://localhost:9000/advisor/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: id,
          authorName: "Advisor",   // you can change this later
          text: newComment.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save comment");
      }

      const updatedPlan = await res.json();
      setPlan(updatedPlan);       // refresh comments with updated plan
      setNewComment("");          // clear textarea
    } catch (err) {
      console.error(err);
      setError("Could not save comment.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading plan...</h2>;
  }

  if (error) {
    return <p style={{ padding: 20 }}>{error}</p>;
  }

  if (!plan) {
    return <p style={{ padding: 20 }}>Plan not found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reviewing: {plan.name}</h1>

      <p>
        <strong>Student:</strong>{" "}
        {plan.owner?.firstName} {plan.owner?.lastName} ({plan.owner?.username})
      </p>
    
      {(plan.desiredGradTerm || plan.desiredGradYear) && (
        <p>
          <strong>Desired Graduation:</strong>{" "}
          {plan.desiredGradTerm ? `${plan.desiredGradTerm} ` : ""}
          {plan.desiredGradYear || ""}
        </p>
      )} 

    <h3>Courses in this plan:</h3>
{plan.courses && plan.courses.length > 0 ? (
  <ul>
    {plan.courses.map((course) => (
      <li key={course._id}>
        {course.name}{" "}
        {formatSemestersOffered(course.semestersOffered)}
      </li>
    ))}
  </ul>
) : (
  <p>No courses listed in this plan.</p>
)}

      <h3 style={{ marginTop: "30px" }}>Existing Advisor Comments:</h3>
      {plan.comments && plan.comments.length > 0 ? (
        <ul>
          {plan.comments.map((c, idx) => (
            <li key={idx}>
              <strong>{c.authorName || "Advisor"}:</strong> {c.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      <div style={{ marginTop: "30px" }}>
        <h3>Leave New Feedback</h3>
        <textarea
          placeholder="Write feedback for this plan..."
          style={{ width: "100%", height: "100px" }}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <br />
        <button
          style={{ marginTop: "10px" }}
          onClick={handleSubmitComment}
          disabled={saving}
        >
          {saving ? "Saving..." : "Submit Comment"}
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/advisor">← Back to Advisor Dashboard</Link>
      </div>
    </div>
  );
}

export default AdvisorPlans;
    };

    fetchPlan();
  }, [id]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      setSaving(true);
      setError("");

      const res = await fetch("http://localhost:9000/advisor/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: id,
          authorName: "Advisor",   // you can change this later
          text: newComment.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save comment");
      }

      const updatedPlan = await res.json();
      setPlan(updatedPlan);       // refresh comments with updated plan
      setNewComment("");          // clear textarea
    } catch (err) {
      console.error(err);
      setError("Could not save comment.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading plan...</h2>;
  }

  if (error) {
    return <p style={{ padding: 20 }}>{error}</p>;
  }

  if (!plan) {
    return <p style={{ padding: 20 }}>Plan not found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reviewing: {plan.name}</h1>

      <p>
        <strong>Student:</strong>{" "}
        {plan.owner?.firstName} {plan.owner?.lastName} ({plan.owner?.username})
      </p>
    
      {(plan.desiredGradTerm || plan.desiredGradYear) && (
        <p>
          <strong>Desired Graduation:</strong>{" "}
          {plan.desiredGradTerm ? `${plan.desiredGradTerm} ` : ""}
          {plan.desiredGradYear || ""}
        </p>
      )} 

    <h3>Courses in this plan:</h3>
{plan.courses && plan.courses.length > 0 ? (
  <ul>
    {plan.courses.map((course) => (
      <li key={course._id}>
        {course.name}{" "}
        {formatSemestersOffered(course.semestersOffered)}
      </li>
    ))}
  </ul>
) : (
  <p>No courses listed in this plan.</p>
)}

      <h3 style={{ marginTop: "30px" }}>Existing Advisor Comments:</h3>
      {plan.comments && plan.comments.length > 0 ? (
        <ul>
          {plan.comments.map((c, idx) => (
            <li key={idx}>
              <strong>{c.authorName || "Advisor"}:</strong> {c.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      <div style={{ marginTop: "30px" }}>
        <h3>Leave New Feedback</h3>
        <textarea
          placeholder="Write feedback for this plan..."
          style={{ width: "100%", height: "100px" }}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <br />
        <button
          style={{ marginTop: "10px" }}
          onClick={handleSubmitComment}
          disabled={saving}
        >
          {saving ? "Saving..." : "Submit Comment"}
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/advisor">← Back to Advisor Dashboard</Link>
      </div>
    </div>
  );
}

export default AdvisorPlans;
    };

    fetchPlan();
  }, [id]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      setSaving(true);
      setError("");

      const res = await fetch("http://localhost:9000/advisor/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: id,
          authorName: "Advisor",   // you can change this later
          text: newComment.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save comment");
      }

      const updatedPlan = await res.json();
      setPlan(updatedPlan);       // refresh comments with updated plan
      setNewComment("");          // clear textarea
    } catch (err) {
      console.error(err);
      setError("Could not save comment.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading plan...</h2>;
  }

  if (error) {
    return <p style={{ padding: 20 }}>{error}</p>;
  }

  if (!plan) {
    return <p style={{ padding: 20 }}>Plan not found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reviewing: {plan.name}</h1>

      <p>
        <strong>Student:</strong>{" "}
        {plan.owner?.firstName} {plan.owner?.lastName} ({plan.owner?.username})
      </p>

    <h3>Courses in this plan:</h3>
{plan.courses && plan.courses.length > 0 ? (
  <ul>
    {plan.courses.map((course) => (
      <li key={course._id}>
        {course.name}{" "}
        {formatSemestersOffered(course.semestersOffered)}
      </li>
    ))}
  </ul>
) : (
  <p>No courses listed in this plan.</p>
)}

      <h3 style={{ marginTop: "30px" }}>Existing Advisor Comments:</h3>
      {plan.comments && plan.comments.length > 0 ? (
        <ul>
          {plan.comments.map((c, idx) => (
            <li key={idx}>
              <strong>{c.authorName || "Advisor"}:</strong> {c.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      <div style={{ marginTop: "30px" }}>
        <h3>Leave New Feedback</h3>
        <textarea
          placeholder="Write feedback for this plan..."
          style={{ width: "100%", height: "100px" }}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <br />
        <button
          style={{ marginTop: "10px" }}
          onClick={handleSubmitComment}
          disabled={saving}
        >
          {saving ? "Saving..." : "Submit Comment"}
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/advisor">← Back to Advisor Dashboard</Link>
      </div>
    </div>
  );
}

export default AdvisorPlans;

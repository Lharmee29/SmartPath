import React, { useEffect, useState } from "react";
import "./default.css";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:9000/api";

const CreatePlan = () => {
  const [name, setName] = useState("");
  const [isPublic, setPublic] = useState(false);
  const [courses, setCourses] = useState([]);
  const [comments, setComments] = useState([]);
  const [advisors, setAdvisors] = useState([]);

  const [majors, setMajors] = useState([]);
  const [loadingMajors, setLoadingMajors] = useState(true);
  const [majorsError, setMajorsError] = useState(null);

  const [selectedMajorId, setSelectedMajorId] = useState("");
  const [selectedMajor, setSelectedMajor] = useState(null);

  const [loadingMajorDetails, setLoadingMajorDetails] = useState(false);
  const [majorError, setMajorError] = useState(null);

  // get the logged-in user id from localStorage (set in Login.jsx)
  const ownerId = localStorage.getItem("userId");

  // 1) Load list of majors on first render
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        setLoadingMajors(true);
        setMajorsError(null);

        const res = await fetch(`${API_BASE_URL}/majors`);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();
        setMajors(data);
      } catch (err) {
        console.error("Error fetching majors:", err);
        setMajorsError("Could not load majors. Please try again later.");
      } finally {
        setLoadingMajors(false);
      }
    };

    fetchMajors();
  }, []);

  // 2) When user selects a major, load its required courses
  const handleSelectMajor = async (event) => {
    const majorId = event.target.value;
    setSelectedMajorId(majorId);
    setSelectedMajor(null);
    setMajorError(null);

    if (!majorId) return;

    try {
      setLoadingMajorDetails(true);

      const res = await fetch(`${API_BASE_URL}/majors/${majorId}`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      setSelectedMajor(data);
      // NOTE: we are NOT putting these into courses[] yet.
    } catch (err) {
      console.error("Error fetching major details:", err);
      setMajorError("Could not load major details.");
    } finally {
      setLoadingMajorDetails(false);
    }
  };

  const handleCreatePlan = async (event) => {
  event.preventDefault();

  if (!ownerId) {
    alert("No logged in user found. Please log in again.");
    return;
  }

  try {
    const body = {
      owner: ownerId,
      name: name || "My Plan",
      courses: [],           // we’re not using Course documents yet
      public: isPublic,
    };

    // If a major is selected, include it + its courses
    if (selectedMajor) {
      body.majorId = selectedMajor.id;
      body.majorName = selectedMajor.name;
      body.majorCourses = selectedMajor.requiredCourses || [];
    }

    const res = await axios.post("http://localhost:9000/createPlan", body);
    console.log("Plan created:", res.data);
    alert("Plan created!");
    window.location.href = "/ViewPlans";

    // simple reset for now
    setName("");
    setPublic(false);
    setCourses([]);
  } catch (err) {
    console.error("Error creating plan:", err);
    alert("Error making plan");
  }
};

  return (
    <div className="page-header">
      <h1>Create Plan</h1>

      {/* Plan basic settings */}
      <div className="box">
        <form onSubmit={handleCreatePlan}>
          <label htmlFor="plan-name">Plan name:</label>
          <br />
          <input
            id="plan-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />

          <label htmlFor="public-select">Public? </label>
          <br />
          <select
            id="public-select"
            onChange={(e) => setPublic(e.target.value === "true")}
            value={isPublic ? "true" : "false"}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>

          <br />
          <br />
          <button type="submit">Create Plan</button>
        </form>
      </div>

      {/* Major selection + details */}
      <div className="box" style={{ marginTop: "20px" }}>
        <h2>Select a Major</h2>

        {loadingMajors && <p>Loading majors...</p>}

        {majorsError && <p style={{ color: "red" }}>{majorsError}</p>}

        {!loadingMajors && !majorsError && (
          <>
            <label htmlFor="major-select">Major:</label>
            <br />
            <select
              id="major-select"
              value={selectedMajorId}
              onChange={handleSelectMajor}
            >
              <option value="">-- Choose a major --</option>
              {majors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>

            {loadingMajorDetails && <p>Loading major details...</p>}
            {majorError && <p style={{ color: "red" }}>{majorError}</p>}

            {selectedMajor && (
              <div style={{ marginTop: "15px" }}>
                <h3>{selectedMajor.name}</h3>
                <p>{selectedMajor.description}</p>
                <p>Total credits: {selectedMajor.totalCredits}</p>

                <h4>Required Courses</h4>
                <ul>
                  {selectedMajor.requiredCourses &&
                    selectedMajor.requiredCourses.map((c) => (
                      <li key={c.code}>
                        {c.code} – {c.name} ({c.credits} credits,{" "}
                        {c.suggestedTerm})
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePlan;

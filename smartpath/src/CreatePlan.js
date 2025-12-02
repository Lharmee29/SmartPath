import React, { useEffect, useState} from "react";
import './default.css';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:9000/api";

const CreatePlan = () => {
  const [majors, setMajors] = useState([]);
  const [loadingMajors, setLoadingMajors] = useState(true);
  const [majorsError, setMajorsError] = useState(null);

  const [selectedMajorId, setSelectedMajorId] = useState("");
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [loadingMajorDetails, setLoadingMajorDetails] = useState(false);
  const [majorError, setMajorError] = useState(null);

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

    if (!majorId) return; // user picked "Choose a major"

    try {
      setLoadingMajorDetails(true);

      const res = await fetch(`${API_BASE_URL}/majors/${majorId}`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      setSelectedMajor(data);
    } catch (err) {
      console.error("Error fetching major details:", err);
      setMajorError("Could not load major details.");
    } finally {
      setLoadingMajorDetails(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Create Plan</h1>
      <p>This is where students will create or edit their academic plan.</p>
    </div>
  );
};

export default CreatePlan;
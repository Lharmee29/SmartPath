import React, { useEffect, useState} from "react";
import './default.css';
import axios from 'axios'

const handleCreatePlan = (event, owner, name, courses, isPublic) => {
    const modified = Date.now
    event.preventDefault()
    axios.post('http://localhost:9000/createPlan', {owner, name, courses, isPublic})
    .catch((err) => alert('err making plan'))
}


const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:9000/api";

const CreatePlan = () => {
	const [name, setName] = useState('');
    const [isPublic, setPublic] = useState(false);
    const [courses, setCourses] = useState([])
    const [comments, setComments] = useState([]);
    const [advisors, setAdvisors] = useState([])
	const [majors, setMajors] = useState([]);
	const [loadingMajors, setLoadingMajors] = useState(true);
	const [majorsError, setMajorsError] = useState(null);
	const [selectedMajorId, setSelectedMajorId] = useState("");
	const [selectedMajor, setSelectedMajor] = useState(null);
	const [electiveId, setSelectedElectiveId] = useState(null);
	const [elective, setSelectedElective] = useState(null);
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

	const handleSelectElective = (event) => {
    const electiveId = event.target.value;
    setSelectedElectiveId(electiveId);

    if (!electiveId || !selectedMajor || !selectedMajor.electives) {
      setSelectedElective(null);
      return;
    }

    const elective = selectedMajor.electives.find(
      (e) => e.id === electiveId
    );

    setSelectedElective(elective || null);
  };
  const owner = localStorage.getItem("user")
	
  return (
    <div sclass="page-header">
      <h1>Create Plan</h1>
      <div class="box">
        <form>
          <label for="name">Plan name:</label><br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/><br />
          <label for="public">Public? </label>
          <select onChange={(e) => setPublic(e.target.value)} value={isPublic}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
          </select>
          <button type="button" onClick={(event) => handleCreatePlan(event, owner, name, courses, isPublic)}>
                        Create Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlan;

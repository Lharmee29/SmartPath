import "./default.css";
import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdvisor, setIsAdvisor] = useState(false);   

  const handleSignUp = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:9000/createUser", {
        firstName,
        lastName,
        username,
        password, 
      })
      .then(() => {
        alert("Signup successful! You can now log in.");
        window.location.href = "/Login";
      })
      .catch((err) => {
        console.error(err);
        alert("Error in Signing Up");
      });
  };

  return (
    <div className="page-header">
      <h1>Signup</h1>
      <div className="box">
        <form onSubmit={handleSignUp}>
          <label htmlFor="fn">First Name: </label>
          <br />
          <input
            id="fn"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />

          <label htmlFor="ln">Last Name: </label>
          <br />
          <input
            id="ln"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />

          <label htmlFor="userID">User ID: </label>
          <br />
          <input
            id="userID"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <label htmlFor="pw">Password: </label>
          <br />
          <input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <label htmlFor="advisorCheck">
            <input
              id="advisorCheck"
              type="checkbox"
              checked={isAdvisor}
              onChange={(e) => setIsAdvisor(e.target.checked)}
              style={{ marginRight: "6px" }}
            />
            I am an advisor
          </label>
          <br />
          <br />

          <button type="submit">Signup</button>
        </form>

        <p>
          Already have an account?{" "}
          <a href="http://localhost:3000/Login" target="_self" rel="noopener noreferrer">
            Login!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;


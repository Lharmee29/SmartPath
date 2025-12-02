import "./default.css";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .get("http://localhost:9000/getUser", { params: { username, password } })
      .then((res) => {
        if (res.data) {
          const user = res.data;

          localStorage.setItem("userId", user._id);
          localStorage.setItem("userFullName", `${user.firstName} ${user.lastName}`);
          localStorage.setItem("username", user.username);
          localStorage.setItem("user", JSON.stringify(user)); 

          alert("Login Successful");

          if (user.isAdvisor) {
            window.location.href = "/advisor";    
          } else {
            window.location.href = "/Dashboard";  
          }
        } else {
          alert("Wrong Credentials");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error in Login");
      });
  };

  return (
    <div className="page-header">
      <h1>Login</h1>
      <div className="box">
        <form onSubmit={handleLogin}>
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

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account?{" "}
          <a
            href="http://localhost:3000/Signup"
            target="_self"
            rel="noopener noreferrer"
          >
            Signup!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

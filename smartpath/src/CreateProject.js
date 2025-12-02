import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateProject = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/getUsers").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="page-header">
      <h1>Create Project</h1>

      <label>Product Owner</label>
      <select>
        {users.map((u) => (
          <option key={u._id}>{u.username}</option>
        ))}
      </select>

      <label>Project Manager</label>
      <select>
        {users.map((u) => (
          <option key={u._id}>{u.username}</option>
        ))}
      </select>
    </div>
  );
};

export default CreateProject;

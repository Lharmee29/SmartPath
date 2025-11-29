import './default.css';
import axios from 'axios'
import React, { useState } from 'react';

const handleSignUp = (event, firstName, lastName, username, password) => {
    axios.post('http://localhost:9000/createUser', { firstName, lastName, username, password })
        .catch((err) => alert('Error in Signing Up'))
}

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="page-header">
            <h1>Signup</h1>
            <div class="box">
                <form>
                    <label for="fn">First Name: </label><br />
                    <input 
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}/><br />
                    <label for="ln">Last Name: </label><br />
                    <input  
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}/><br />
                    <label for="userID">User ID: </label><br />
                    <input  
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/><br />
                    <label for="pw">Password: </label><br />
                    <input  
                        type="text"
                        value={password}
                        onChange={(e) =>setPassword(e.target.value)}/><br />
                    <button 
                        type="button" onClick={(event) => handleSignUp(event, firstName, lastName, username, password)}>
                        Signup
                    </button>
                </form>
                <p>
                    Already have an account? <a
                        href="http://localhost:3000/Login"
                        target="_self"
                        rel="noopener noreferrer"
                    > Login!</a>
                </p>
            </div>
        </div> 
    );
}

export default Signup; 

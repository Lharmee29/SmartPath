import './default.css';
import {React, useState} from "react";
import axios from 'axios'

const handleLogin = (event, username, password) => {
    axios.get('http://localhost:9000/getUser', { params: { username, password}})
        .then((res) => {
            if (res.data) {
                alert('Login Successful')
            }
            else {
                alert('Wrong Credentials')
            }
        })
        .catch((err) => alert('Error in Login'))
}

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div class="page-header">
            <h1>Login</h1>
            <div class="box">
                <form>
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
                    <button type="button" onClick={(event) => {
                                            handleLogin(event, username, password)}}>
                             Login</button>
                </form>
                <p>
                    Don't have an account? <a 
                    href="http://localhost:3000/Signup"
                    target="_self"
                    rel="noopener noreferrer">
                        Signup!
                    </a>
                </p>
            </div>
        </div> 
    );
}
export default Login; 

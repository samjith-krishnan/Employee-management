import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { tokenget } from "../api/allApi";

function Login() {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    tokenget({username,password}).then(response=>{
        sessionStorage.setItem("access_token", response.data.access);
        sessionStorage.setItem("refresh_token", response.data.refresh);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
        navigate('/home')

        
    })
     


  };
  return (
    <>
    
    <div className="login-container d-grid">
      
      <form onSubmit={handleSubmit} className="login-form">
      <h4 className="text-center mt-3 mb-3">Login page</h4>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-btn className='btn btn-primary w-100'">
          Login
        </button>
        <Link to='/register'>Not a user?</Link>
      </form>
    </div>

    </>
  )
}

export default Login
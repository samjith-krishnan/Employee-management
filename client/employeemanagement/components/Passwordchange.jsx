import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { passwordchange } from "../api/allApi";

function Passwordchange() {

  const [oldpassword, setoldpassword] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token=sessionStorage.getItem("access_token")

    
    const data={
        old_password:oldpassword,
        new_password:password
    }
    passwordchange(token,data).then(res=>{
        alert('password changed')
        navigate('/home')

    })

     
     


  };
  return (
    <div>
        <div className="login-container d-grid">
      
      <form onSubmit={handleSubmit} className="login-form">
      <h4 className="text-center mt-3 mb-3">Change password</h4>
        <div className="form-group">
          <label htmlFor="username">old password</label>
          <input
            type="password"
            id="username"
            value={oldpassword}
            onChange={(e) => setoldpassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

       

        <button type="submit" className="login-btn className='btn btn-primary w-100'">
          change
        </button>
       
      </form>
    </div>

    </div>
  )
}

export default Passwordchange
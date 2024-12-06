import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
 const navigate=useNavigate()

    const handleclick=()=>{
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
         navigate('/')
        
        delete axios.defaults.headers.common["Authorization"];

    }
  return (
    <div>
        <button className='btn btn-outline' onClick={handleclick}>
              logout
        </button>
    </div>
  )
}

export default Logout
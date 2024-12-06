import React, { useState } from 'react'
import { useradd } from '../api/allApi'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate=useNavigate()
    const [register,setregister]=useState({
        first_name:'',
        company:'',
        place:'',
        phone:'',
        username:'',
        password:'',

    })

    const handlesubmit=(event)=>{
        event.preventDefault();
        useradd(register).then(res=>{
            setregister({
                first_name:'',
                company:'',
                place:'',
                phone:'',
                username:'',
                password:'',
        
            })
            navigate('/')

        }).catch(err=>{
            console.log(err);
            
        })
    }
  return (
    <div>
        <div className="login-container d-grid">
      
      <form className="login-form" onSubmit={handlesubmit}>
      <h4 className="text-center mt-3 mb-3">Register page</h4>
        <div className="form-group">
          <label htmlFor="username">First_name</label>
          <input
            type="text"
            id="username"
          
            onChange={(e) =>
                setregister({ ...register, first_name: e.target.value })
               }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">company</label>
          <input
            type="text"
            
            
            onChange={(e) =>
                setregister({ ...register, company: e.target.value })
               }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">place</label>
          <input
            type="text"
            
            
            onChange={(e) =>
                setregister({ ...register, place: e.target.value })
               }
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="company">phone</label>
          <input
            type="number"
            
            
            onChange={(e) =>
                setregister({ ...register, phone: e.target.value })
               }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">username</label>
          <input
            type="text"
            onChange={(e) =>
                setregister({ ...register, username: e.target.value })
               }
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="company">password</label>
          <input
            type="password"

            onChange={(e) =>
                setregister({ ...register, password: e.target.value })
               }
            required
          />
        </div>

        

        <button type="submit" className='btn btn-primary w-100'>
          Login
        </button>
        <Link to='/'>already a user?</Link>
      </form>
    </div>

    </div>
  )
}

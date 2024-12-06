import React, { useEffect, useState } from "react";

import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { getform } from "../api/allApi";
import Header from "./Header";

function Home() {
  const navigate = useNavigate();
  const [getForm, setGetForm] = useState([]);

  useEffect(() => {
    handleformget();
  }, []);
const token=sessionStorage.getItem('access_token')
  const handleformget = () => {
    getform(token).then((res) => {
      setGetForm(res.data);
     
    });
  };

  const handleClick = (id) => {
    navigate(`/formview/${id}`);
  };

  const handleviewData = (id) => {
    navigate(`/formdata/${id}`);
  };

  return (
    <>
    
      
    <Header/>
     
      <div className="container mt-5">
        
        <h3 className="mb-4 text-center">Forms Created</h3>
        <div className="d-grid">
          {getForm.length <=0 ? <h6 className="text-center">no forms created</h6>:(
          getForm.map((item) => (
            <div
              key={item.id}
              className="card shadow-sm p-3 mb-4 col-md-6 mx-auto"
              style={{ borderRadius: "8px" }}
            >
              <h5 className="card-title">{item.name}</h5>
              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => handleClick(item.id)}
                >
                  Add Data
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleviewData(item.id)}
                >
                  View Data
                </button>
              </div>
            </div>
          )))}
        </div>
      </div>
    </>
  );
}

export default Home;

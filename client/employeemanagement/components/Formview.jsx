import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { formsubmit, getSingleform } from '../api/allApi';
import Header from './Header';

function Formview() {
    const {id}=useParams()
    const [form, setForm] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    const [responses,setResponses]=useState([])


    useEffect(() =>{
      
     
  
      fetchForm();
    }, []);


    const fetchForm=()=>{
      setIsLoading(true)
      getSingleform(id).then(res=>{
        setIsLoading(false)
        setForm(res.data)
      }).catch(err=>{
        console.log('error',err);
        
      })
    }
  
    const handleChange = (fieldId, value) => {
      setResponses((prevResponses) => {
        const updatedResponses = [...prevResponses];
    
        const existingResponseIndex = updatedResponses.findIndex(
          (response) => response.field === fieldId
        );
    
        if (existingResponseIndex > -1) {
        
          updatedResponses[existingResponseIndex] = { field: fieldId, value };
        } else {
       
          updatedResponses.push({ field: fieldId, value });
        }
    
        return updatedResponses;
      });
    };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        formsubmit(responses,id).then(res=>{
          console.log(responses);
          
          setResponses({
            field:'',
            value:''
          })
          alert("Form submitted successfully!");
        }).catch(err=>{
          console.log(err);
          
        })
        
       
      };
    
      if (isLoading) {
        return <p>Loading form...</p>;
      }
    
      if (!form) {
        return <p>No form found with the given ID.</p>;
      }
      return (<>
        <Header/>
        <div className='d-flex justify-content-center '>
          <div style={{width:'500px'}}>
            <h2 className='text-center mt-5 mb-3'>{form.name}</h2>
            <form onSubmit={handleSubmit}>
              {form.fields.map((field) => (
                <div key={field.id} style={{ marginBottom: "20px" }}>
                  <label>
                    <strong>{field.label}</strong>
                  </label>
                  <br />
                
                  {field.field_type === "text" && (
                    <input
                      value={responses.value}
                      type="text"
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      style={{ width: "100%", padding: "8px" }}
                    />
                  )}
                  {field.field_type === "number" && (
                    <input
                    value={responses.value}

                      type="number"
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      style={{ width: "100%", padding: "8px" }}
                    />
                  )}
                  {field.field_type === "email" && (
                    <input
                    value={responses.value}

                      type="email"
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      style={{ width: "100%", padding: "8px" }}
                    />
                  )}
                  {field.field_type === "radio" &&
                    field.choices.map((choice) => (
                      <div key={choice.id}>
                        <input
                        
                          type="radio"
                          name={`field-${field.id}`}
                          value={choice.choice_text}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                        />
                        <label>{choice.choice_text}</label>
                      </div>
                    ))}
                  {field.field_type === "checkbox" &&
                    field.choices.map((choice) => (
                      <div key={choice.id}>
                        <input
                          type="checkbox"
                          value={choice.choice_text}
                          onChange={(e) =>
                            handleChange(field.id, [
                              ...(responses[field.id] || []),
                              e.target.value,
                            ])
                          }
                        />
                        <label>{choice.choice_text}</label>
                      </div>
                    ))}
                  {field.field_type === "select" && (
                    <select
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      style={{ width: "100%", padding: "8px" }}
                    >
                      <option value="">Select...</option>
                      {field.choices.map((choice) => (
                        <option key={choice.id} value={choice.choice_text}>
                          {choice.choice_text}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
              <button className='btn btn-primary w-100' type="submit" style={{ padding: "10px 20px" }}>
                Submit
              </button>
            </form>
          </div>
        </div>
        </>);
    };

export default Formview
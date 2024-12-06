import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteformdata, formdata } from '../api/allApi';
import { FaTrash } from 'react-icons/fa'; // Import a trash icon from react-icons
import Header from './Header';

function FormData() {
    const { id } = useParams();
    const [responses, setResponses] = useState([]);
    const [allresponses,setAllresponses]=useState([])

    useEffect(() => {
        fetchFormData();
    }, []);

    const fetchFormData = () => {
        formdata(id).then((res) => {
            setResponses(res.data);
            setAllresponses(res.data)
           
        });
    };

    const handleDelete = (id) => {
      deleteformdata(id).then(res=>{
        alert('entity deleted')
        fetchFormData();
     
      }).catch(err=>{
        alert('error occured',err)
      })
       
    };
    const uniqueFields = Object.keys(responses[0] || {});

    const FilterData = (data) => {
      const filtereddata = allresponses.filter((item) =>
        uniqueFields.some((field) =>
          String(item[field] || "").toLowerCase().includes(data.toLowerCase())
        )
      );
          
      
  
      if(filtereddata){
        setResponses(filtereddata)
        
      }
      else if(filtereddata===''){
        setResponses(allstudent)
      }
    }
    

    

    return (<><Header/>
                   <div className='container mt-5' style={{border:'black 1px solid'}}>
                    <input
                      className="form-control mt-4 mb-4"
                      type="text"
                      placeholder="Search for data ..."
                      
                      aria-describedby="btnNavbarSearch"
                      style={{border:'1px black solid'}}
                      onChange={(e) => FilterData(e.target.value)}
                    />
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        {uniqueFields.map((field) => (
                            <th key={field}>{field}</th>
                        ))}
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {responses.map((response, index) => (
                        <tr key={index}>
                            {uniqueFields.map((field) => (
                                <td key={field}>{response[field]}</td>
                            ))}
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(response.id)}
                                >
                                    <FaTrash /> 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>);
}

export default FormData;

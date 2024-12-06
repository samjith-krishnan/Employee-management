import React, { useState } from "react";
import { addform } from "../api/allApi";
import { FaPlus, FaCheck, FaTrash } from "react-icons/fa";
import "./Formbuild.css";
import Header from "./Header";

function Formbuilders() {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([...fields, { label: "", field_type: "text", choices: [] }]);
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleAddChoice = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].choices.push({ choice_text: "" });
    setFields(updatedFields);
  };

  const handleChoiceChange = (fieldIndex, choiceIndex, value) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].choices[choiceIndex].choice_text = value;
    setFields(updatedFields);
  };

  const handleDeleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name: formName, fields };
    
    try {
      await addform(formData);
      alert("Form created successfully!");
      setFormName("");
      setFields([]);
    } catch (err) {
      console.error(err);
      alert("Error creating form!");
    }
  };

  return (<><Header/>
    <div className="container mt-5">
      
      <h2 className="text-center mb-4">Form Creation</h2>
      <div className="card shadow-lg p-4">
        <form>
          <div className="mb-4">
            <label className="form-label">Form Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter form name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
            />
          </div>

          {fields.map((field, index) => (
            <div className="mb-4" key={index}>
              <div className="d-flex align-items-center gap-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Field Label"
                  value={field.label}
                  onChange={(e) =>
                    handleFieldChange(index, "label", e.target.value)
                  }
                  required
                />
                <select
                  className="form-select"
                  value={field.field_type}
                  onChange={(e) =>
                    handleFieldChange(index, "field_type", e.target.value)
                  }
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="radio">Radio</option>
                  <option value="password">Password</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="select">Select</option>
                </select>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteField(index)}
                  title="Delete Field"
                >
                  <FaTrash />
                </button>
              </div>
              {["radio", "checkbox", "select"].includes(field.field_type) && (
                <div className="mt-3">
                  <h6>Choices</h6>
                  {field.choices.map((choice, choiceIndex) => (
                    <div key={choiceIndex} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Choice Text"
                        value={choice.choice_text}
                        onChange={(e) =>
                          handleChoiceChange(index, choiceIndex, e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleAddChoice(index)}
                  >
                    <FaPlus /> Add Choice
                  </button>
                </div>
              )}
            </div>
          ))}
        </form>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-primary"
            type="button"
            onClick={addField}
          >
            <FaPlus /> Add Field
          </button>
          <button
            className="btn btn-success"
            type="button"
            onClick={handleSubmit}
          >
            <FaCheck /> Create Form
          </button>
        </div>
      </div>
    </div>
  </>);
}

export default Formbuilders;

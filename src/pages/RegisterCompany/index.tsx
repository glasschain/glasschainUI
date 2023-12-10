import { Signer, Provider } from "ethers";
import React, { useState } from "react";
import registerCompany from "../../hooks/interact/registerCompany";
import styled from "styled-components";

interface MyFormProps {
  signer: Signer | Provider;
}

const FormWrapper = styled.div`
  display: grid;
  place-items: center; /* shorthand for align-items: center and justify-content: center */
  height: 100vh; /* Set the height of the form wrapper to the full viewport height */
  font-family: "Arial", sans-serif; /* Use a specific font family */

  div {
    background-color: #f5f5f5; /* Light gray background for the form container */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h2 {
    color: #333; /* Dark text color for the heading */
  }

  form {
    display: grid;
    gap: 10px;
    max-width: 400px; /* Limit the form width for better readability */
    margin: 0 auto; /* Center the form within the container */
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  button {
    background-color: teal; /* Green submit button */
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #45a049; /* Darker green on hover */
  }
`;

const RegisterCompany: React.FC<MyFormProps> = ({ signer }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    domain: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your custom logic for handling the form submission goes here
    // For demonstration purposes, let's just log the form data
    console.log("Form submitted:", formData);
    console.log(signer);
    const resp = await registerCompany(
      signer,
      formData.name,
      formData.domain,
      formData.description
    );
    console.log(resp);
  };

  return (
    <FormWrapper>
      <div>
        <h2>Enter Information:</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            cols="50"
            required
          ></textarea>
          <br />

          <label htmlFor="domain">Domain:</label>
          <input
            type="text"
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            required
          />
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </FormWrapper>
  );
};

export default RegisterCompany;

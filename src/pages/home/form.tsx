import { Signer, Provider } from 'ethers';
import React, { useState } from 'react';
import registerCompany from '../../hooks/interact/registerCompany';


interface MyFormProps {
    signer: Signer | Provider;
  }

  const MyForm: React.FC<MyFormProps> = ({ signer }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    domain: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your custom logic for handling the form submission goes here
    // For demonstration purposes, let's just log the form data
    console.log('Form submitted:', formData);
    console.log(signer);
    const resp = await registerCompany(signer, formData.name, formData.domain, formData.description);
    console.log(resp);

  };

  return (
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
  );
};

export default MyForm;

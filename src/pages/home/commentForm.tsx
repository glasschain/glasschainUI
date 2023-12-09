import { Provider, Signer } from 'ethers';
import React, { useState } from 'react';
import fetchReview from '../../hooks/interact/fetchReview';

interface SimpleFormProps {
    signer: Signer | Provider;
}

const SimpleForm: React.FC<SimpleFormProps> = ({ signer }) => {
  const [commentId, setCommentId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Your custom logic for handling the form submission goes here
    // Optionally, you can reset the form after submission
    setCommentId('');
    console.log('Form submitted:', commentId, signer);
    const tx = await fetchReview(signer, commentId);
    console.log('tx', tx);
  };

  return (
    <div>
      <h2>Simple Form:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="commentId">Comment ID:</label>
          <input
            type="text"
            id="commentId"
            name="commentId"
            value={commentId}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SimpleForm;

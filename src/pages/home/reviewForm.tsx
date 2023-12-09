import { Provider, Signer } from 'ethers';
import React, { useState } from 'react';
import addReview from '../../hooks/interact/addReview';

interface ReviewFormProps {
    signer: Signer | Provider;
}

interface ReviewFormData {
  rating: number;
  comment: string;
  companyDomain: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ signer }) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 1,
    comment: '',
    companyDomain: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rating = parseInt(e.target.value, 10);
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Your custom logic for handling the form submission goes here
    // onSubmit(formData);
    // Optionally, you can reset the form after submission
    setFormData({
      rating: 1,
      comment: '',
      companyDomain: '',
    });
    // print form data to the console
    console.log('Form submitted:', formData, signer);
    const tx = await addReview(signer, formData.companyDomain, formData.rating, formData.comment);
    console.log(tx);
  };

  return (
    <div>
      <h2>Leave a Review:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating (1-5):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleRatingChange}
            min={1}
            max={5}
            required
          />
        </div>
        <br />

        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={4}
            cols={50}
            required
          ></textarea>
        </div>
        <br />

        <div>
          <label htmlFor="companyDomain">Company Domain:</label>
          <input
            type="text"
            id="companyDomain"
            name="companyDomain"
            value={formData.companyDomain}
            onChange={handleChange}
            required
          />
        </div>
        <br />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;

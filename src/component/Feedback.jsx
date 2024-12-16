import React, { useState, useEffect } from "react";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "",
    rating: "",
    comment: "",
  });

  const [allFeedback, setAllFeedback] = useState([]);

  useEffect(() => {
    // Load feedback from localStorage on component mount
    const feedbackFromLS = JSON.parse(localStorage.getItem("feedback")) || [];
    setAllFeedback(feedbackFromLS);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateAverageRating = () => {
    if (allFeedback.length === 0) return 0;
    const total = allFeedback.reduce(
      (sum, feedback) => sum + parseInt(feedback.rating),
      0
    );
    return (total / allFeedback.length).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the feedback to localStorage
    const updatedFeedback = [...allFeedback, formData];
    localStorage.setItem("feedback", JSON.stringify(updatedFeedback));
    setAllFeedback(updatedFeedback);

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      feedbackType: "",
      rating: "",
      comment: "",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-8 w-[100%] overflow-hidden mx-auto flex flex-col gap-5 bg-gray-100 h-auto text-black rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold text-center">Feedback Form</h1>

        {/* Feedback Type */}
        <select
          name="feedbackType"
          value={formData.feedbackType}
          onChange={handleChange}
          className="bg-gray-200 px-4 py-2 rounded-md border border-gray-300"
        >
          <option value="">Select Feedback Type</option>
          <option value="Customer Support">Customer Support</option>
          <option value="Delivery">Delivery</option>
          <option value="Product Quality">Product Quality</option>
          <option value="Other">Other</option>
        </select>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="bg-gray-200 px-4 py-2 rounded-md border border-gray-300"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="bg-gray-200 px-4 py-2 rounded-md border border-gray-300"
        />

        {/* Comment */}
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows="5"
          placeholder="Enter your comment"
          className="bg-gray-200 px-4 py-2 rounded-md border border-gray-300"
        ></textarea>

        {/* Rating */}
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="bg-gray-200 px-4 py-2 rounded-md border border-gray-300"
        >
          <option value="">Rate us</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* Display Feedback */}
      <div className="w-2/3 min-h-screen bg-indigo-600 p-8">
        <h2 className="text-2xl text-white font-bold mb-4">Feedback Received</h2>

        {/* Display Total Feedback and Average Rating */}
        <div className="text-white mb-6">
          <p>
            <strong>Total Feedback:</strong> {allFeedback.length}
          </p>
          <p>
            <strong>Average Rating:</strong> {calculateAverageRating()}
          </p>
        </div>

        {allFeedback.length === 0 ? (
          <p className="text-white">No feedback available yet.</p>
        ) : (
          allFeedback.map((feedback, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md mb-4 text-black"
            >
              <p>
                <strong>Name:</strong> {feedback.name}
              </p>
              <p>
                <strong>Email:</strong> {feedback.email}
              </p>
              <p>
                <strong>Feedback Type:</strong> {feedback.feedbackType}
              </p>
              <p>
                <strong>Rating:</strong> {feedback.rating}
              </p>
              <p>
                <strong>Comment:</strong> {feedback.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Feedback;
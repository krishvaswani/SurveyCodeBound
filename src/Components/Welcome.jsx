// src/components/Welcome.js
import React from "react";

const Welcome = ({ onStart }) => {
  return (
    <div className="bg-blue-200 p-8 w-80 mx-auto mt-10 rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-6">Welcome to the Customer Survey</h1>
      <p className="mb-6">We value your feedback! Please take a moment to answer a few questions.</p>
      <button
        onClick={onStart}
        className="bg-pink-500 text-white py-2 px-4 rounded-lg text-lg"
      >
        Start Survey
      </button>
    </div>
  );
};

export default Welcome;

// src/components/Survey.js
import React, { useState, useEffect } from "react";
import questions from "../data/questions";

const Survey = ({ onSurveyComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const storedAnswers = localStorage.getItem("surveyAnswers");
    return storedAnswers ? JSON.parse(storedAnswers) : {};
  });
  const [completed, setCompleted] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (id, answer) => {
    const updatedAnswers = { ...answers, [id]: answer };
    setAnswers(updatedAnswers);
    localStorage.setItem("surveyAnswers", JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleComplete = () => {
    setCompleted(true);
    localStorage.setItem("surveyStatus", "COMPLETED");
    setShowThanks(true);

    // Show the "Thank You" message for 5 seconds, then trigger the callback to return to the welcome screen
    setTimeout(() => {
      setShowThanks(false);
      onSurveyComplete();
    }, 5000);
  };

  if (showThanks) {
    return (
      <div className="text-center py-10 text-lg">
        Thank you for your time! Redirecting to the welcome screen...
      </div>
    );
  }

  if (completed) {
    return <div className="text-center py-10 text-lg">Survey Completed</div>;
  }

  return (
    <div className="bg-blue-200 p-8 w-80 mx-auto mt-10 rounded-lg shadow-lg">
      <h1 className="text-center text-lg font-bold mb-4">Customer Survey</h1>
      <div className="text-right text-sm mb-4">
        {currentQuestionIndex + 1}/{questions.length}
      </div>
      <div className="mb-6">
        <p className="mb-2">{currentQuestion.text}</p>
        {currentQuestion.type === "rating" && (
          <div className="flex justify-center space-x-3">
            {Array.from({ length: currentQuestion.maxRating }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handleAnswerChange(currentQuestion.id, i + 1)}
                className={`w-8 h-8 rounded-full border ${
                  answers[currentQuestion.id] === i + 1
                    ? "bg-red-500 text-white"
                    : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
        {currentQuestion.type === "text" && (
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
          />
        )}
      </div>
      <div className="flex justify-between">
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded-lg ${
            currentQuestionIndex === 0 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
        >
          Prev
        </button>
        <button
          className="bg-pink-500 text-white py-2 px-4 rounded-lg"
          onClick={handleNext}
        >
          {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Survey;

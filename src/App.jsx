// src/App.js
import React, { useState } from "react";
import Survey from "./Components/Survey";
import Welcome from "./Components/Welcome";

const App = () => {
  const [surveyStarted, setSurveyStarted] = useState(false);

  const handleStartSurvey = () => {
    setSurveyStarted(true);
  };

  const handleSurveyComplete = () => {
    setSurveyStarted(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {surveyStarted ? (
        <Survey onSurveyComplete={handleSurveyComplete} />
      ) : (
        <Welcome onStart={handleStartSurvey} />
      )}
    </div>
  );
};

export default App;

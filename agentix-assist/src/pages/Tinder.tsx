import React, { useState, useEffect, useRef } from "react";
import TinderCard from "react-tinder-card";
import "./Tinder.css"

function Tinder() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const childRefs = useRef([]);

  // Fetch questions from Flask backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_questions")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Questions:", data);
        setQuestions(data);
        childRefs.current = data.map((_, i) => childRefs.current[i] || React.createRef());
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const swiped = (direction, correctAnswer, index) => {
    if (direction === correctAnswer) {
      setScore(score + 1);
    }
    setCurrentIndex(index + 1);
  };

  return (
	<div id="tinder" className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col items-center justify-center text-center">

	<h1 className="gradient-text text-3xl font-bold">Tinder for Tax: Swipe to Learn</h1>
	{/* <span >Tax Returns Made Simple With AI Assistance</span> */}

	<h2 className="text-taxblue-500 text-xl mt-2">Score: {score}</h2>
  
	{questions.length === 0 ? (
	  <p className="text-lg mt-4">Loading questions...</p>
	) : (
	  <div className="cardContainer mt-6">
		{questions.map((question, index) => (
		  <TinderCard
			ref={childRefs.current[index]}
			className="swipe"
			key={question.question} // Unique key
			onSwipe={(dir) => swiped(dir, question.answer, index)}
		  >
			<div className="card  text-lg font-semibold p-4 shadow-md">
			  {question?.question || "No Question Found"}
			</div>
		  </TinderCard>
		))}
	  </div>
	)}
  </div>
  
  );
}

export default Tinder;

// CollegeProfile.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const CollegeProfile = () => {
    //ASK QUESTION
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get("/api/questions");
            setQuestions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const askQuestion = async () => {
        try {
            const newQuestion2 = newQuestion; // Initialize newQuestion2 with the value of newQuestion
            const response = await axios.post("/api/questions", {
                question: newQuestion2,
                college_id: id,
                user_id: userId,
            });
            const newQuestion = response.data;
            setQuestions([...questions, newQuestion]);
            setNewQuestion("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <div>
                    <h3>Ask a Question</h3>
                    <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <button onClick={askQuestion}>Submit</button>
                </div>
                <div>
                    <h3>Questions</h3>
                    {questions.length === 0 && <p>No questions available</p>}
                    {questions.map((question) => (
                        <div key={question.id}>
                            <p>{question.user.name} asked:</p>
                            <p>{question.question}</p>
                            {question.answer && (
                                <p>Answer: {question.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollegeProfile;

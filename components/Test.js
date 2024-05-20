import React from 'react';
import './Test.css'; 

function Test({ questions, onFinish }) {
    const handleFinish = () => {
        onFinish();
    };
      
    return (
        <div className="test-wrapper">
            <div className="test-container">
                <h2>Тест</h2>
                {questions && questions.length > 0 ? (
                    questions.map((question, index) => (
                        <div key={index}>
                            <h3>{question.question}</h3>
                            {question.answers.map((answer, ansIndex) => (
                                <label key={ansIndex}>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={ansIndex}
                                        onChange={() => {
                                            const updatedQuestions = [...questions];
                                            updatedQuestions[index].selectedAnswer = ansIndex;
                                        }}
                                    />
                                    {answer.answer}
                                </label>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>Питань для тесту не обрано</p>
                )}
                <button onClick={handleFinish}>Завершити тест</button>
            </div>
        </div>
    );
}


export default Test;
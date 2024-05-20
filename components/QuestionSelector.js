import React from 'react';
import './QuestionSelector.css'; 

function QuestionSelector({ questions, onSelect }) {
  return (
    <div className="question-selector">
      <h2 className="question-selector__title">Виберіть питання для тесту:</h2>
      <ul className="question-selector__list">
        {questions.map((question, index) => (
          <li key={index} className="question-selector__item">
            <label className="question-selector__label">
              <input
                className="question-selector__checkbox"
                type="checkbox"
                onChange={(e) => onSelect(index, e.target.checked)}
              />
              <span className="question-selector__text">{question.question}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionSelector;
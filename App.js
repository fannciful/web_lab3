import React, { useState, useEffect } from 'react';
import QuestionSelector from './components/QuestionSelector';
import Test from './components/Test';
import testData from './questions.json';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(testData.questions.length).fill(null));
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    setQuestions(testData.questions);
  }, []);

  const handleQuestionSelect = (index, selected) => {
    const newSelectedQuestions = [...selectedQuestions];
    const question = { ...questions[index] };

    if (selected) {
      newSelectedQuestions.push(question);
    } else {
      const questionIndex = newSelectedQuestions.findIndex((q) => q.question === question.question);
      newSelectedQuestions.splice(questionIndex, 1);
    }

    setSelectedQuestions(newSelectedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex) => {
    setSelectedAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = answerIndex;
      return updatedAnswers;
    });
  };

  const calculateScore = () => {
    let score = 0;
    selectedQuestions.forEach((question, index) => {
      const correctAnswerIndex = question.answers.findIndex(answer => answer.isCorrect);
      if (selectedAnswers[index] === correctAnswerIndex) {
        score++;
      }
    });
    setCorrectAnswersCount(score);
  };

  const handleStartTest = () => {
    if (selectedQuestions.length > 0) {
      setIsTestStarted(true);
    } else {
      alert('Будь ласка, виберіть хоча б одне питання для тесту');
    }
  };

  const handleFinishTest = () => {
    setIsTestStarted(false);
    calculateScore(); // Calculate correct answers count
    setIsTestFinished(true);
  };

  const handleRestartTest = () => {
    setSelectedQuestions([]);
    setIsTestStarted(false);
    setIsTestFinished(false);
    setSelectedAnswers(Array(testData.questions.length).fill(null));
    setCorrectAnswersCount(0);
  };

  return (
    <div>
      {!isTestStarted && !isTestFinished && (
        <div>
          <QuestionSelector
            questions={questions}
            onSelect={handleQuestionSelect}
          />
          <button onClick={handleStartTest}>Почати тест</button>
        </div>
      )}
      {isTestStarted && !isTestFinished && (
        <Test
          questions={selectedQuestions}
          selectedAnswers={selectedAnswers}
          correctAnswers={questions.map(question => question.answers.findIndex(answer => answer.isCorrect))}
          onAnswerChange={handleAnswerChange}
          onFinish={handleFinishTest}
        />
      )}
      {isTestFinished && (
        <div>
          <h2>Результати тесту:</h2>
          <p>Ви відповіли правильно на {correctAnswersCount} з {selectedQuestions.length} питань.</p>
          <button onClick={handleRestartTest}>Повторити тест</button>
        </div>
      )}
    </div>
  );
}

export default App;

import { useState } from 'react';
import { assessmentQuestions, calculatePersona } from '../data/assessmentQuestions';
import './Assessment.css';

function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [persona, setPersona] = useState(null);

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Move to next question or show results
    if (currentQuestion < assessmentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Calculate results
      const totalScore = Object.values(newAnswers).reduce((sum, val) => sum + val, 0);
      const result = calculatePersona(totalScore);
      setPersona(result);
      setShowResults(true);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setPersona(null);
  };

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  if (showResults && persona) {
    return (
      <div className="assessment">
        <div className="results-container">
          <h1>Your Cyber Persona</h1>
          <div className="persona-card" style={{ borderColor: persona.color }}>
            <h2 style={{ color: persona.color }}>{persona.name}</h2>
            <div className="risk-badge" style={{ backgroundColor: persona.color }}>
              Risk Level: {persona.riskLevel}
            </div>
            <p className="persona-description">{persona.description}</p>

            <div className="vulnerabilities">
              <h3>Your Vulnerabilities:</h3>
              <ul>
                {persona.vulnerabilities.map((vuln, index) => (
                  <li key={index}>{vuln}</li>
                ))}
              </ul>
            </div>

            <div className="action-plan">
              <h3>Your Action Plan:</h3>
              <ol>
                {persona.actionPlan.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ol>
            </div>
          </div>

          <button onClick={resetAssessment} className="retake-button">
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  const question = assessmentQuestions[currentQuestion];

  return (
    <div className="assessment">
      <div className="assessment-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="question-counter">
          Question {currentQuestion + 1} of {assessmentQuestions.length}
        </div>

        <div className="question-card">
          <h2>{question.question}</h2>
          <div className="options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${answers[question.id] === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(question.id, option.value)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {currentQuestion > 0 && (
          <button
            className="back-button"
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            ← Previous Question
          </button>
        )}
      </div>
    </div>
  );
}

export default Assessment;


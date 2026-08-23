import React, { createContext, useState, useContext } from 'react';

const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: selectedOptionIndex }
  const [questionStatus, setQuestionStatus] = useState({}); // { questionId: 'answered' | 'unanswered' | 'review' | 'not-visited' }
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(3600);
  const [testResult, setTestResult] = useState(null);

  const startTest = (test) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTestResult(null);
    setTimeLeftSeconds((test.durationMinutes || 60) * 60);

    const initialStatus = {};
    if (test.questions && test.questions.length > 0) {
      test.questions.forEach((q, idx) => {
        initialStatus[q.id] = idx === 0 ? 'unanswered' : 'not-visited';
      });
    }
    setQuestionStatus(initialStatus);
  };

  const selectOption = (questionId, optionIndex) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setQuestionStatus((prev) => ({ ...prev, [questionId]: 'answered' }));
  };

  const clearResponse = (questionId) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
    setQuestionStatus((prev) => ({ ...prev, [questionId]: 'unanswered' }));
  };

  const markForReview = (questionId) => {
    setQuestionStatus((prev) => ({ ...prev, [questionId]: 'review' }));
  };

  const navigateToQuestion = (index) => {
    if (!activeTest || !activeTest.questions) return;
    setCurrentQuestionIndex(index);
    const qId = activeTest.questions[index].id;
    setQuestionStatus((prev) => {
      if (prev[qId] === 'not-visited') {
        return { ...prev, [qId]: 'unanswered' };
      }
      return prev;
    });
  };

  const submitTest = () => {
    if (!activeTest) return;

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    activeTest.questions.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected === undefined || selected === null) {
        unattemptedCount++;
      } else if (selected === q.correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const marksPerQ = activeTest.totalMarks / activeTest.totalQuestions;
    const rawScore = (correctCount * marksPerQ) - (wrongCount * (activeTest.negativeMarking || 0.25));
    const finalScore = Math.max(0, Number(rawScore.toFixed(2)));
    const percentage = Number(((finalScore / activeTest.totalMarks) * 100).toFixed(1));

    const resultData = {
      testId: activeTest._id,
      testTitle: activeTest.title,
      score: finalScore,
      totalMarks: activeTest.totalMarks,
      percentage,
      correctCount,
      wrongCount,
      unattemptedCount,
      rank: Math.floor(Math.random() * 12) + 1,
      totalParticipants: 1450,
      userAnswers,
      test: activeTest
    };

    setTestResult(resultData);
    return resultData;
  };

  return (
    <TestContext.Provider
      value={{
        activeTest,
        currentQuestionIndex,
        userAnswers,
        questionStatus,
        timeLeftSeconds,
        setTimeLeftSeconds,
        testResult,
        startTest,
        selectOption,
        clearResponse,
        markForReview,
        navigateToQuestion,
        submitTest
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => useContext(TestContext);

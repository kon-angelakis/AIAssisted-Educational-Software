import Header from "../../Reusable/Header";
import CategSelectionButton from "../CategSelectionButton";
import CategTab from "../CategTab";
import { data, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const maxQuestions = 1;
  const { difficulty, subjectIndex, subject, questionCount, isAiGenerated } =
    location.state || {};

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const [score, setScore] = useState(0);
  const [failedQuestions, setFailedQuestions] = useState([]);

  //On website load
  useEffect(() => {
    setLoading(true);

    const questionType = Math.random() < 0.5 ? "MC" : "TF";
    if (isAiGenerated) generateQuestion(questionType);
    else randomizeQuestion();
  }, [questionCount]);

  //Stop on the nth number of questions
  useEffect(() => {
    if (questionCount === maxQuestions) {
      submitResults(),
        navigate("/home", {
          state: {
            playConfetti: true,
          },
        });
      alert(`Test over. You got ${score}/${maxQuestions} questions right.`);
    }
  }, [questionCount]);

  function generateQuestion(questionType) {
    return axios
      .post(
        "http://localhost:1010/CreateThread",
        {
          message: `language: JAVA, topic: ${subject}, difficulty: ${difficulty}, style: ${questionType}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setQuestion(data.question);
        setAnswers(
          questionType === "MC"
            ? [
                data.answers[0],
                data.answers[1],
                data.answers[2],
                data.answers[3],
              ]
            : [data.answers[0], data.answers[1]]
        );
        setCorrectAnswer(data.correct_answer);
        setLoading(false); // Stop loading
        return data;
      })
      .catch((error) => {
        console.error("Error generating question:", error);
        setLoading(false); // Stop loading even if failed
      });
  }

  function randomizeQuestion() {
    let questionsList = JSON.parse(
      localStorage.getItem("UserDetails")
    ).failedQuestions;

    if (!questionsList || questionsList.length === 0) {
      alert("No failed questions available.");
      navigate("/home");
      window.location.reload();
    }

    const randomIndex = Math.floor(Math.random() * questionsList.length);
    const randomQuestionObject = questionsList[randomIndex];

    setQuestion(JSON.parse(randomQuestionObject).question);
    setAnswers(JSON.parse(randomQuestionObject).answers);
    setCorrectAnswer(JSON.parse(randomQuestionObject).correct_answer);
    setLoading(false);
  }

  //Set user score
  function validateAnswer(index) {
    if (index === correctAnswer) setScore((prevScore) => prevScore + 1);
    else
      setFailedQuestions((prev) => [
        ...prev,
        { question: question, answers: answers, correct_answer: correctAnswer },
      ]);
  }

  function submitResults() {
    const results = {
      email: JSON.parse(localStorage.getItem("UserDetails")).email,
      difficulty: difficulty,
      subjectIndex: subjectIndex,
      score: score,
      mistakes: maxQuestions - score,
      failed: failedQuestions,
    };

    return axios
      .post("http://localhost:1010/submit", results)
      .then((response) => {
        console.log(`Successful:`, response.data);
      })
      .catch((error) => {
        console.error(`Error:`, error);
        throw error;
      });
  }

  return (
    <>
      <Header />
      {loading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Loading question...</h1>
        </div>
      ) : (
        <CategTab
          text={`Question: ${question} | ${questionCount + 1}/${maxQuestions}`}
          style={{ width: "100vw" }}
          categButtons={answers.map((answer, index) => (
            <CategSelectionButton
              key={index}
              text={index === correctAnswer ? `${answer} ✅` : `${answer} ❌`}
              onClick={() => {
                validateAnswer(index);
                navigate("/practice/test", {
                  state: {
                    difficulty,
                    subjectIndex,
                    subject,
                    questionCount: questionCount + 1,
                    isAiGenerated: isAiGenerated,
                  },
                });
              }}
            />
          ))}
        />
      )}
    </>
  );
}

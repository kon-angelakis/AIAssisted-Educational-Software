import Header from "../../Reusable/Header";
import CategSelectionButton from "../CategSelectionButton";
import CategTab from "../CategTab";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const maxQuestions = 10;
  const { difficulty, subjectIndex, subject, questionCount, isAiGenerated } =
    location.state || {};

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const [score, setScore] = useState(0);
  const [failedQuestions, setFailedQuestions] = useState([]);

  //On website load each time
  useEffect(() => {
    setLoading(true);

    //For revision questions are pulled from the database
    if (!isAiGenerated) randomizeQuestion();
  }, [questionCount]);

  //Stop on the nth number of questions and generate a set of questions once
  useEffect(() => {
    if (questionCount === 0) {
      generateQuestion();
    } else if (questionCount === maxQuestions) {
      submitResults(),
        navigate("/home", {
          state: {
            playConfetti: true,
          },
        });
      alert(`Test over. You got ${score}/${maxQuestions} questions right.`);
    } else {
      const storedQuestions = JSON.parse(localStorage.getItem("questions"));

      setQuestion(storedQuestions[questionCount].question);
      setAnswers(
        storedQuestions[questionCount].question_type === "MC"
          ? [
              storedQuestions[questionCount].answers[0],
              storedQuestions[questionCount].answers[1],
              storedQuestions[questionCount].answers[2],
              storedQuestions[questionCount].answers[3],
            ]
          : [
              storedQuestions[questionCount].answers[0],
              storedQuestions[questionCount].answers[1],
            ]
      );
      setCorrectAnswer(storedQuestions[questionCount].correct_answer_index);
      setLoading(false); // Stop loading
    }
  }, [questionCount]);

  function generateQuestion() {
    return axios
      .post(
        "http://localhost:1010/QuestionGiver",
        {
          message: `language: JAVA, topic: ${subject}, difficulty: ${difficulty}, number_of_questions: ${maxQuestions}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        localStorage.setItem("questions", JSON.stringify(data));

        setQuestion(data[0].question);
        setAnswers(
          data[0].question_type === "MC"
            ? [
                data[0].answers[0],
                data[0].answers[1],
                data[0].answers[2],
                data[0].answers[3],
              ]
            : [data[0].answers[0], data[0].answers[1]]
        );
        setCorrectAnswer(data[0].correct_answer_index);
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
          <h1>Loading questions...</h1>
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

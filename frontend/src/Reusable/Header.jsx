import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import StatsCategory from "./StatsCategory";
import axios from "axios";
import Recommendation from "./Recommendation";

export default function Header() {
  let userDetails = JSON.parse(localStorage.getItem("UserDetails"));
  let firstName = userDetails.firstName;
  let lastName = userDetails.lastName;
  let correct = userDetails.correct;
  let totalCorrect = userDetails.totalCorrect;
  let mistakes = userDetails.mistakes;
  let totalMistakes = userDetails.totalMistakes;
  let testsTaken = userDetails.testsTaken;
  let failedQuestions = userDetails.failedQuestions;

  const [visibility, setVisibility] = useState("visible");
  const [statDisplay, setStatDisplay] = useState("none");
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);

  const subjectMap = [
    ["Vars & Types", "Conditionals", "Arrays", "Loops"], // Easy
    ["Functions", "Objects", "Inheritance", "Abstraction"], // Medium
    ["Interfaces", "Exceptions", "Generics", ""], // Hard (last column unused)
  ];

  function expandUserSegment() {
    let a = document.getElementById("extended-seg");
    if (visibility == "hidden") setVisibility("visible");
    else setVisibility("hidden");
    a.style.visibility = visibility;
  }

  function StartRevisionTest() {
    navigate("/practice/test", {
      state: {
        questionCount: 0,
        isAiGenerated: false,
      },
    });
  }

  function ViewStats() {
    let b = document.getElementById("stats-container");
    let statsBox = b.querySelector(".general-container");

    if (statDisplay === "none") {
      setStatDisplay("flex");
      b.style.display = "flex";
      statsBox.classList.remove("general-container-animate");
      void statsBox.offsetWidth;
      statsBox.classList.add("general-container-animate");
    } else {
      setStatDisplay("none");
      b.style.display = "none";
    }

    //run it every time the stat box is shown(could make it so it runs only once but we want it to update if the user has a new weakness that was not mentioned before)
    setRecommendations([]);
    if (statDisplay === "none") {
      axios
        .post("http://localhost:1010/getweakestsubjects", {
          subjects: mistakes,
        })
        .then((response) => {
          const [i, j] = response.data[0];
          const [i2, j2] = response.data[1];
          const [i3, j3] = response.data[2];
          axios
            .post(
              "http://localhost:1010/WeaknessEvaluator",
              {
                message: `categories: {${subjectMap[i][j]},${subjectMap[i2][j2]},${subjectMap[i3][j3]}}, correct: {${mistakes[i][j]},${mistakes[i2][j2]},${mistakes[i3][j3]}}, failedQuestions: {${failedQuestions}}`,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              setRecommendations(response.data);
            })

            .catch((error) => {
              console.error("Error generating answer:", error);
            });
        })
        .catch((error) => {
          console.error(`Error:`, error);
          throw error; // Rethrow to catch in the main logic
        });
    }
  }

  function Logout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <div
        className="stats-recommendations-container"
        id="stats-container"
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: "1",
          top: "0",
          display: "none",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(5px) brightness(30%)",
          backgroundColor: "rgba(24, 24, 24, 0.01)",
        }}
      >
        <div
          className="general-container"
          style={{
            width: "80vw",
            height: "80vh",
            backgroundColor: "#242424",
            borderRadius: "2vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            gap: "5vh",
            overflowY: "scroll",
            overflowX: "hidden",
            scrollSnapType: "y-mandatory",
            scrollBehavior: "smooth",
          }}
        >
          <div
            className="stats"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              gap: "5vh",
              scrollSnapAlign: "start",
            }}
          >
            <div
              className="stats-title"
              style={{ width: "100%", textAlign: "center", height: "10%" }}
            >
              <h1>Stats</h1>
            </div>
            <div
              className="stats-information"
              style={{
                width: "90%",
                textAlign: "center",
                height: "70%",
                display: "flex",
                flexDirection: "row",
                overflowY: "auto",
                overflowX: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <StatsCategory
                difficulty={"Easy"}
                stats={[
                  {
                    label: "Mistakes in " + subjectMap[0][0],
                    value: mistakes[0][0],
                  },
                  {
                    label: "Mistakes in " + subjectMap[0][1],
                    value: mistakes[0][1],
                  },
                  {
                    label: "Mistakes in " + subjectMap[0][2],
                    value: mistakes[0][2],
                  },
                  {
                    label: "Mistakes in " + subjectMap[0][3],
                    value: mistakes[0][3],
                  },
                  { label: "Mistakes total", value: totalMistakes[0] },
                  { label: "Total tests taken", value: testsTaken[0] },
                  {
                    label: "Right/Wrong Ratio",
                    value:
                      Math.round(
                        (totalCorrect[0] / (totalMistakes[0] + 1)) * 100
                      ) / 100,
                  },
                  {
                    label: "Total Correct",
                    value: totalCorrect[0],
                    endValue: 40,
                    isProgressBar: true,
                  },
                ]}
              />

              <StatsCategory
                difficulty={"Medium"}
                stats={[
                  {
                    label: "Mistakes in " + subjectMap[1][0],
                    value: mistakes[1][0],
                  },
                  {
                    label: "Mistakes in " + subjectMap[1][1],
                    value: mistakes[1][1],
                  },
                  {
                    label: "Mistakes in " + subjectMap[1][2],
                    value: mistakes[1][2],
                  },
                  {
                    label: "Mistakes in " + subjectMap[1][3],
                    value: mistakes[1][3],
                  },
                  { label: "Mistakes total", value: totalMistakes[1] },
                  { label: "Total tests taken", value: testsTaken[1] },
                  {
                    label: "Right/Wrong Ratio",
                    value:
                      Math.round(
                        (totalCorrect[1] / (totalMistakes[1] + 1)) * 100
                      ) / 100,
                  },
                  {
                    label: "Total Correct",
                    value: totalCorrect[1],
                    endValue: 40,
                    isProgressBar: true,
                  },
                ]}
              />

              <StatsCategory
                difficulty={"Hard"}
                stats={[
                  {
                    label: "Mistakes in " + subjectMap[2][0],
                    value: mistakes[2][0],
                  },
                  {
                    label: "Mistakes in " + subjectMap[2][1],
                    value: mistakes[2][1],
                  },
                  {
                    label: "Mistakes in " + subjectMap[2][2],
                    value: mistakes[2][2],
                  },
                  { label: "Mistakes total", value: totalMistakes[2] },
                  { label: "Total tests taken", value: testsTaken[2] },
                  {
                    label: "Right/Wrong Ratio",
                    value:
                      Math.round(
                        (totalCorrect[2] / (totalMistakes[2] + 1)) * 100
                      ) / 100,
                  },
                  {
                    label: "Total Correct",
                    value: totalCorrect[2],
                    endValue: 30,
                    isProgressBar: true,
                  },
                ]}
              />
            </div>
          </div>
          <div
            className="recommendations"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              gap: "5vh",
              scrollSnapAlign: "start",
            }}
          >
            <div
              className="recommendations-title"
              style={{ width: "100%", textAlign: "center", height: "10%" }}
            >
              <h1>Recommendations</h1>
            </div>
            {recommendations && recommendations.length > 0
              ? recommendations.map((recommendation, index) => (
                  <Recommendation
                    key={index}
                    subject={recommendation.topic}
                    summary={recommendation.summary}
                    link={recommendation.link}
                  />
                ))
              : [...Array(3)].map((_, index) => <Recommendation key={index} />)}
          </div>
        </div>
      </div>
      <div
        className="tab-container"
        style={{
          fontSize: "0.8vw",
          width: "100vw",
          backgroundColor: "#cccccc09",
          borderTopLeftRadius: "2vw",
          borderTopRightRadius: "2vw",
          position: "absolute",
          top: "0",
          zIndex: "2",
        }}
      >
        <div
          className="header-container"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <div
            className="app-info"
            style={{
              borderTopLeftRadius: "2vw",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "5vw",
              position: "absolute",
              left: "0",
              paddingLeft: "2vw",
              paddingRight: "2vw",
            }}
            title="StackTrek"
          >
            <img
              src="../../icon.svg"
              onClick={() => {
                navigate("/home");
              }}
              style={{
                width: "5vw",
                height: "5vw",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            ></img>
          </div>
          <h1>StackTrek v1.0</h1>
          <div
            className="user-info"
            style={{
              borderTopRightRadius: "2vw",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "5vw",
              position: "absolute",
              right: "0",
              paddingLeft: "2vw",
              paddingRight: "2vw",
            }}
          >
            <div className="image-seg" onClick={expandUserSegment}>
              <img
                src="../../avatar.png"
                style={{
                  width: "4vw",
                  height: "4vw",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              ></img>
              <div
                className="extended-seg"
                id="extended-seg"
                style={{
                  position: "absolute",
                  zIndex: "3",
                  width: "200px",
                  height: "auto",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexDirection: "column",
                  borderRadius: "1vw",
                  visibility: "hidden",
                  gap: "5px",
                }}
              >
                <button onClick={ViewStats}>View Stats</button>
                <button onClick={StartRevisionTest}>Revision</button>
                <button style={{ backgroundColor: "red" }} onClick={Logout}>
                  Logout
                </button>
              </div>
            </div>
            <div
              className="userdetails-seg"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "end",
              }}
            >
              <h3 style={{ height: "10%", margin: "0" }}>Welcome, </h3>
              <h3 style={{ height: "10%", margin: "0" }}>
                {firstName} {lastName.substr(0, 1)}.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

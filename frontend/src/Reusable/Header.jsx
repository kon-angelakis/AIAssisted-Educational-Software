import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import StatsCategory from "./StatsCategory";
import ProgressBar from "@ramonak/react-progress-bar";

export default function Header() {
  let firstName = JSON.parse(localStorage.getItem("UserDetails")).firstName;
  let lastName = JSON.parse(localStorage.getItem("UserDetails")).lastName;
  let correct = JSON.parse(localStorage.getItem("UserDetails")).correct;
  let totalCorrect = JSON.parse(
    localStorage.getItem("UserDetails")
  ).totalCorrect;
  let mistakes = JSON.parse(localStorage.getItem("UserDetails")).mistakes;
  let totalMistakes = JSON.parse(
    localStorage.getItem("UserDetails")
  ).totalMistakes;
  let testsTaken = JSON.parse(localStorage.getItem("UserDetails")).testsTaken;
  const [visibility, setVisibility] = useState("visible");
  const [statDisplay, setStatDisplay] = useState("flex");
  const navigate = useNavigate();

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
    if (statDisplay == "none") setStatDisplay("flex");
    else setStatDisplay("none");
    b.style.display = statDisplay;
  }

  function Logout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <div
        className="stats-container"
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
          backdropFilter: "blur(5px) brightness(50%)",
        }}
      >
        <div
          className="stats"
          style={{
            width: "80vw",
            height: "80vh",
            backgroundColor: "#242424",
            borderRadius: "2vw",
            opacity: "0.95",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
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
              width: "100%",
              textAlign: "center",
              height: "40%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <StatsCategory
              difficulty={"Easy"}
              stats={[
                { label: "Mistakes in Vars & Types", value: mistakes[0][0] },
                { label: "Mistakes in Conditionals", value: mistakes[0][1] },
                { label: "Mistakes in Arrays", value: mistakes[0][2] },
                { label: "Mistakes in Loops", value: mistakes[0][3] },
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
                { label: "Mistakes in Functions", value: mistakes[1][0] },
                { label: "Mistakes in Objects", value: mistakes[1][1] },
                { label: "Mistakes in Inheritance", value: mistakes[1][2] },
                { label: "Mistakes inAbstraction", value: mistakes[1][3] },
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
                { label: "Mistakes in Interfaces", value: mistakes[2][0] },
                { label: "Mistakes in Exceptions", value: mistakes[2][1] },
                { label: "Mistakes in Generics", value: mistakes[2][2] },
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
          <h1>StackTrek</h1>
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
                src="https://sdmntprpolandcentral.oaiusercontent.com/files/00000000-e8b4-620a-807e-fa7d924e0f5e/raw?se=2025-05-14T17%3A07%3A13Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=76024c37-11e2-4c92-aa07-7e519fbe2d0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-14T06%3A17%3A54Z&ske=2025-05-15T06%3A17%3A54Z&sks=b&skv=2024-08-04&sig=oOlgzzP3/2vwOX81Bzs4qo%2BGLUZ2od49zNLwgg07EvE%3D"
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
                <button onClick={StartRevisionTest}>Revision</button>
                <button onClick={ViewStats}>View Stats</button>
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

import { useEffect } from "react";
import Header from "../../Reusable/Header";
import DifSelectionButton from "./DifSelectionButton";
import DifTab from "./DifTab";
import { useNavigate } from "react-router-dom";

export default function DifficultyPage({ mode }) {
  const navigate = useNavigate();
  let totalDifficultyScores = JSON.parse(
    localStorage.getItem("UserDetails")
  ).totalCorrect;

  return (
    <>
      <Header firstName={"John"} lastName={"Pork"} />
      <DifTab
        text={`Select ${mode} Difficulty`}
        difButtons={[
          <DifSelectionButton
            text={"Easy"}
            color={"#51ff00"}
            onClick={() => {
              navigate(`/${mode}/categories`, {
                state: {
                  difficulty: "Easy",
                  subjects: [
                    ["Variables"],
                    ["Conditionals"],
                    ["Arrays"],
                    ["Loops"],
                  ],
                  links: [
                    ["https://www.learnjavaonline.org/en/Variables_and_Types"],
                    ["https://www.learnjavaonline.org/en/Conditionals"],
                    ["https://www.learnjavaonline.org/en/Arrays"],
                    ["https://www.learnjavaonline.org/en/Loops"],
                  ],
                  questionCount: 1,
                },
              });
            }}
          />,
          <DifSelectionButton
            text={"Medium"}
            color={"#ffb900"}
            disabled={totalDifficultyScores[0] <= 32}
            onClick={() => {
              navigate(`/${mode}/categories`, {
                state: {
                  difficulty: "Medium",
                  subjects: [
                    ["Functions"],
                    ["Objects"],
                    ["Inheritance"],
                    ["Abstraction"],
                  ],
                  links: [
                    ["https://www.learnjavaonline.org/en/Functions"],
                    ["https://www.learnjavaonline.org/en/Objects"],
                    [
                      "https://www.learnjavaonline.org/en/Inheritance.org/en/Arrays",
                    ],
                    ["https://www.learnjavaonline.org/en/Abstract_Classes"],
                  ],
                  questionCount: 1,
                },
              });
            }}
          />,
          <DifSelectionButton
            text={"Hard"}
            color={"#ff0000"}
            disabled={totalDifficultyScores[1] <= 32}
            onClick={() => {
              navigate(`/${mode}/categories`, {
                state: {
                  difficulty: "Hard",
                  subjects: [
                    ["Interfaces"],
                    ["Exceptions", "Try/Catch"],
                    ["Generics", "Using Generics"],
                  ],
                  links: [
                    ["https://www.learnjavaonline.org/en/Interfaces"],
                    [
                      "https://www.learnjavaonline.org/en/Exceptions",
                      "https://www.learnjavaonline.org/en/Try_and_Catch",
                    ],
                    [
                      "https://www.learnjavaonline.org/en/Generic_Types",
                      "https://www.learnjavaonline.org/en/Using_Generics",
                    ],
                  ],
                  questionCount: 1,
                },
              });
            }}
          />,
        ]}
      />
    </>
  );
}

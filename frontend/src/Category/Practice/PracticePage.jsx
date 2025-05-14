import Header from "../../Reusable/Header";
import CategSelectionButton from "../CategSelectionButton";
import CategTab from "../CategTab";
import { useNavigate, useLocation } from "react-router-dom";

export default function PracticePage() {
  const location = useLocation();
  const { difficulty, subjects } = location.state || {};
  const navigate = useNavigate();
  let firstname = JSON.parse(localStorage.getItem("UserDetails")).firstName;
  let lastname = JSON.parse(localStorage.getItem("UserDetails")).lastName;

  return (
    <>
      <Header firstName={firstname} lastName={lastname} />
      <CategTab
        text={`Select ${difficulty} Practice Category`}
        categButtons={
          Array.isArray(subjects)
            ? subjects.map((subject, subjectIndex) => (
                <CategSelectionButton
                  key={subject}
                  text={subject[0]}
                  onClick={() => {
                    navigate("/practice/test", {
                      state: {
                        difficulty,
                        // used for the list of lists score array
                        subjectIndex,
                        subject,
                        questionCount: 0,
                        isAiGenerated: true,
                      },
                    });
                  }}
                />
              ))
            : []
        }
      />
    </>
  );
}

import Header from "../../Reusable/Header";
import CategSelectionButton from "../CategSelectionButton";
import CategTab from "../CategTab";
import { useNavigate, useLocation } from "react-router-dom";

export default function LearningPage() {
  const location = useLocation();
  const { difficulty, subjects, links } = location.state || {};
  const navigate = useNavigate();
  let firstname = JSON.parse(localStorage.getItem("UserDetails")).firstName;
  let lastname = JSON.parse(localStorage.getItem("UserDetails")).lastName;

  return (
    <>
      <Header firstName={firstname} lastName={lastname} />
      <CategTab
        text={`Select ${difficulty} Learning Category`}
        categButtons={
          Array.isArray(subjects) && Array.isArray(links)
            ? subjects.map((subject, index) => {
                const link = links[index]; // Get the matching link for the subject
                return (
                  <CategSelectionButton
                    key={subject}
                    text={subject[0]}
                    onClick={() => {
                      navigate("/learning/lesson", {
                        state: {
                          subject,
                          link,
                        },
                      });
                    }}
                  />
                );
              })
            : []
        }
      />
    </>
  );
}

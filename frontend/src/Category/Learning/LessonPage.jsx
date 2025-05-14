import Header from "../../Reusable/Header";
import IFrameLesson from "./Components/IFrameLesson";
import LessonsContainer from "./Components/LessonsContainer";
import { useLocation } from "react-router-dom";

export default function LessonPage() {
  const firstname = JSON.parse(localStorage.getItem("UserDetails")).firstName;
  const lastname = JSON.parse(localStorage.getItem("UserDetails")).lastName;

  const location = useLocation();
  const { subject = [], link = [] } = location.state || {};

  // Combine subject and link arrays into lesson components
  const lessons = subject.map((subj, index) => (
    <IFrameLesson key={index} lesson={subj} source={link[index]} />
  ));

  return (
    <>
      <Header firstName={firstname} lastName={lastname} />
      <LessonsContainer lessons={lessons} />
    </>
  );
}

import ActivityButton from "./ActivityButton";
import { LuBicepsFlexed, LuBookOpen } from "react-icons/lu";
import ActivityTab from "./ActivityTab";
import Header from "../Reusable/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import axios from "axios";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  let firstname = JSON.parse(localStorage.getItem("UserDetails")).firstName;
  let lastname = JSON.parse(localStorage.getItem("UserDetails")).lastName;
  let email = JSON.parse(localStorage.getItem("UserDetails")).email;

  const { playConfetti } = location.state || {};

  useEffect(() => {
    axios
      .post("http://localhost:1010/api/auth/update", { email: email })
      .then((response) => {
        console.log(`Successful JWT Refresh:`, response.data);
        localStorage.setItem(
          "AuthToken",
          response.headers["authorization"].split("Bearer ")[1]
        );
        localStorage.setItem(
          "UserDetails",
          JSON.stringify(response.data.UserDetails)
        );

        return response;
      })
      .catch((error) => {
        if (text === "Login") alert("Invalid Credentials");
        console.error(`Error:`, error);
        throw error; // Rethrow to catch in the main logic
      });
  }, []);

  return (
    <>
      <Header firstName={firstname} lastName={lastname} />
      <ActivityTab
        label={`🖖 Live long and prosper, ${firstname}. What's today's mission? 🚀🛸`}
        activities={[
          <ActivityButton
            text={"Learn"}
            icon={<LuBookOpen size={"150"} />}
            onClick={() => navigate("/learning")}
          />,
          <ActivityButton
            text={"Practice"}
            icon={<LuBicepsFlexed size={"150"} />}
            onClick={() => navigate("/practice")}
          />,
        ]}
      />
      {playConfetti && (
        <Confetti
          width={width}
          height={height}
          confettiSource={{ x: 0, y: height, w: width, h: 0 }}
          initialVelocityY={60}
          numberOfPieces={250}
          gravity={0.2}
          recycle={false}
          friction={0.95}
          tweenDuration={500}
        />
      )}
    </>
  );
}

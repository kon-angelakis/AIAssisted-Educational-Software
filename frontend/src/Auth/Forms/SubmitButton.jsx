import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SubmitButton({ text, data, endpoint }) {
  const navigate = useNavigate();

  function PostData(e) {
    return axios
      .post("http://localhost:1010" + endpoint, data)
      .then((response) => {
        console.log(`Successful:`, response.data);
        //Save the jwt token and user details in local storage
        //Hardcoded check for auth navigation
        if (text === "Login") {
          localStorage.setItem(
            "AuthToken",
            response.headers["authorization"].split("Bearer ")[1]
          );
          localStorage.setItem(
            "UserDetails",
            JSON.stringify(response.data.UserDetails)
          );
          navigate("/home");
        } else {
          navigate("/login");
        }
        return response;
      })
      .catch((error) => {
        if (text === "Login") alert("Invalid Credentials");
        console.error(`Error:`, error);
        throw error; // Rethrow to catch in the main logic
      });
  }

  return (
    <button
      style={{ width: "100%", marginTop: "2em", padding: "1em" }}
      type="submit"
      onClick={PostData}
    >
      {text}
    </button>
  );
}

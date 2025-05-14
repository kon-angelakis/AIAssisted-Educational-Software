import Form from "./Forms/Form";
import InputField from "./Forms/InputField";
import RedirectField from "./Forms/RedirectField";
import SubmitButton from "./Forms/SubmitButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authAxios from "./../../config/axiosConfig";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    authAxios
      .get("/api/auth/authenticated")
      .then(() => {
        navigate("/home", {
          state: {
            playConfetti: false,
          },
        });
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="login-page"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        onSubmit={handleSubmit}
        method="POST"
        name={"Login Page"}
        inputFields={[
          <InputField
            name={"email"}
            placeholder={"john@pork.com"}
            onChange={handleChange}
          />,
          <InputField
            name={"password"}
            placeholder={"jpork123"}
            onChange={handleChange}
          />,
        ]}
        SubmitButton={
          <SubmitButton
            text={"Login"}
            data={formData}
            endpoint="/api/auth/login"
          />
        }
        RedirectField={
          <RedirectField text={"Don't have an account?"} link={"/register"} />
        }
      />
    </div>
  );
}

import Form from "./Forms/Form";
import InputField from "./Forms/InputField";
import RedirectField from "./Forms/RedirectField";
import SubmitButton from "./Forms/SubmitButton";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="register-page"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name={"Register Page"}
        onSubmit={handleSubmit}
        method="POST"
        inputFields={[
          <InputField
            name={"firstname"}
            placeholder={"John"}
            onChange={handleChange}
          />,
          <InputField
            name={"lastname"}
            placeholder={"Pork"}
            onChange={handleChange}
          />,
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
            text={"Register"}
            data={formData}
            endpoint={"/api/auth/register"}
          />
        }
        RedirectField={
          <RedirectField text={"Already have an account?"} link={"/login"} />
        }
      />
    </div>
  );
}

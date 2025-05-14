import "./InputField.css";

export default function Form({
  name,
  inputFields,
  SubmitButton,
  RedirectField,
  onSubmit,
  method,
}) {
  return (
    <div className="form-container">
      <h1>{name}</h1>
      <form className="form" onSubmit={onSubmit} method={method}>
        {inputFields.map((inputField, index) => (
          <div key={index}>{inputField}</div>
        ))}
        {SubmitButton}
      </form>
      {RedirectField}
    </div>
  );
}

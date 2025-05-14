export default function InputField({ name, placeholder, onChange }) {
  return (
    <div className="input-container">
      <h5>{name}</h5>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}

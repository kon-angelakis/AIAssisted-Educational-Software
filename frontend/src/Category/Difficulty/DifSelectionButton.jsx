import "./DifSelectionButton.css";

export default function DifSelectionButton({ text, color, onClick, disabled }) {
  return (
    <button
      className={`difbutton-container${disabled ? " disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        color: disabled ? "white" : color,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <div className="text-container" style={{ fontSize: "2rem" }}>
        <h3>{text}</h3>
      </div>
    </button>
  );
}

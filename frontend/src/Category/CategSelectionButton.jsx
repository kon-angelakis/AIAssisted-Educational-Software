import "./CategSelectionButton.css";

export default function CategSelectionButton({ text, onClick }) {
  return (
    <div className="categbutton-container" onClick={onClick}>
      <div
        className="text-container"
        style={{ width: "100%", textAlign: "center" }}
      >
        <p style={{ fontSize: "1.62rem", padding: "10%", margin: 0 }}>{text}</p>
      </div>
    </div>
  );
}

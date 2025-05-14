import "./ActivityButton.css";

export default function ActivityButton({ text, icon, onClick }) {
  return (
    <div className="button-container" onClick={onClick}>
      <div className="icon-container">{icon}</div>
      <div className="text-container" style={{ fontSize: "2rem" }}>
        <h3>{text}</h3>
      </div>
    </div>
  );
}

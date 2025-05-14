import { Link } from "react-router-dom";

export default function RedirectField({ text, link }) {
  return (
    <div
      className="redirect-container"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <h5>{text}</h5>
      <Link to={link}> Click Here </Link>
    </div>
  );
}

export default function Recommendation({ subject, summary, link }) {
  return (
    <div
      className="recommendation-container"
      style={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "start",
      }}
    >
      <div className="recommendation-subject-title" style={{ width: "100%" }}>
        <h3>{subject}</h3>
      </div>
      <div
        className="recommendation-info"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "1vw",
          alignItems: "center",
        }}
      >
        <div className="recommendation-summary" style={{ width: "90%" }}>
          <p>{summary}</p>
        </div>
        <div className="recommendation-link">
          <button onClick={() => window.open(link, "_blank")} disabled={!link}>
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

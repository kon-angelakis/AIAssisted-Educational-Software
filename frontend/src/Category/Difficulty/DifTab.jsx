export default function DifTab({ text, difButtons }) {
  return (
    <div className="tab-container" style={{ width: "100vw" }}>
      <h1
        style={{
          textAlign: "center",
          paddingBottom: "12vh",
          paddingTop: "12vh",
        }}
      >
        {text}
      </h1>
      <div
        className="buttons-container"
        style={{
          width: "100vw",
          display: "flex",
          gap: "5vw",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "space-between",
        }}
      >
        {difButtons.map((difButton, index) => (
          <div key={index} className="button-item">
            {difButton}
          </div>
        ))}
      </div>
    </div>
  );
}

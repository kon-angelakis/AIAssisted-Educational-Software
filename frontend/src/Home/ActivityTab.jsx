export default function ActivityTab({ label, activities }) {
  return (
    <div
      className="tab-container"
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "5vh",
        flexShrink: 1,
      }}
    >
      <div className="label-container">
        <p style={{ fontSize: "3vw", fontWeight: "bolder" }}>{label}</p>
      </div>
      <div
        className="activities-container"
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "space-evenly",
          gap: "10%",
          position: "relative",
        }}
      >
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
}

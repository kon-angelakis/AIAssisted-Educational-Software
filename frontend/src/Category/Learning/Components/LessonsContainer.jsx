export default function LessonsContainer({ lessons }) {
  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <div
        className="lessons-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2vh",
          alignItems: "center",
          width: "95vw",
          marginTop: "5vh",
        }}
      >
        {lessons.map((lesson, index) => (
          <div
            key={index}
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {lesson}
          </div>
        ))}
      </div>
    </div>
  );
}

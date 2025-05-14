import ProgressBar from "@ramonak/react-progress-bar";

export default function StatsCategory({ difficulty, stats }) {
  return (
    <div
      className="stats-container"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        gap: "20%",
      }}
    >
      <div className="title" style={{ width: "100%", height: "10%" }}>
        <h2>{difficulty}</h2>
      </div>
      <div
        className="info"
        style={{
          width: "50%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "flex-end",
        }}
      >
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            {stat.isProgressBar !== true ? (
              <p>
                {stat.label}: {stat.value}
              </p>
            ) : (
              <>
                <p>
                  {stat.label}: {stat.value} / {stat.endValue}
                </p>
                <ProgressBar
                  completed={
                    Math.round((stat.value / stat.endValue) * 100 * 100) / 100
                  }
                  maxCompleted={100}
                  bgColor="#00D2A8"
                  baseBgColor="#151515"
                  labelAlignment="outside"
                  height="15px"
                  labelSize="1em"
                  animateOnRender
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

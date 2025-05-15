import ProgressBar from "@ramonak/react-progress-bar";

export default function StatsCategory({ difficulty, stats }) {
  return (
    <div
      className="stats-container"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <div
        className="title"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#00d2a8",
          border: "1px solid black",
        }}
      >
        <h2>{difficulty}</h2>
      </div>
      <div
        className="info"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-item"
            style={{
              width: "50%",
              marginTop: "10px",
            }}
          >
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

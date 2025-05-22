import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Recommendation({ subject, summary, link }) {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
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
        <div className="recommendation-subject-title" style={{ width: "20%" }}>
          <h3>
            {subject || (
              <Skeleton height={15} style={{ borderRadius: "5rem" }} />
            )}
          </h3>
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
          <div className="recommendation-summary" style={{ width: "100%" }}>
            <p style={{ textAlign: "justify", width: "95%" }}>
              {summary || (
                <Skeleton
                  height={10}
                  style={{ borderRadius: "5rem" }}
                  width={"95%"}
                  count={4.8}
                />
              )}
            </p>
          </div>
          <div
            className="buttons"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div className="recommendation-link">
              <button
                onClick={() => window.open(link, "_blank")}
                disabled={!link}
              >
                Learn More
              </button>
            </div>
            <div className="practice-link">
              <button>Train More</button>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

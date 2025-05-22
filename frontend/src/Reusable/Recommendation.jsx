import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

export default function Recommendation({ subject, summary, link }) {
  const navigate = useNavigate();

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
                  duration={1.85}
                />
              )}
            </p>
          </div>
          <div
            className="buttons"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {link ? (
              <>
                <div className="recommendation-link">
                  <button
                    onClick={() => window.open(link, "_blank")}
                    disabled={!link}
                  >
                    Learn More
                  </button>
                </div>
                <div className="practice-link">
                  <button
                    onClick={() => {
                      localStorage.removeItem("questions");

                      navigate(`/practice/test`, {
                        state: {
                          questionCount: 0,
                          isPersonalised: true,
                          personalizedDescription: summary,
                        },
                      });
                    }}
                  >
                    Train More
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Skeleton height={50} width={100} duration={1.1} />
                </div>
                <div>
                  <Skeleton height={50} width={100} duration={1.1} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

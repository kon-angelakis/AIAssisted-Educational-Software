import { useEffect, useState } from "react";
import axios from "axios";

export default function IFrameLesson({ lesson, source }) {
  const [cleanSource, setCleanSource] = useState("source");
  useEffect(() => {
    scrapeData();
  }, []);
  function scrapeData() {
    return axios
      .post(
        "http://localhost:1010/scrape",
        {
          message: `${source}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const htmlContent = response.data;
        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        setCleanSource(url);
      })
      .catch((error) => {
        console.error("Error generating question:", error);
      });
  }

  return (
    <div
      className="iframe-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "75vw",
        height: "75vh",
      }}
    >
      <h2>{lesson}</h2>
      <iframe
        src={cleanSource}
        title={lesson}
        sandbox=""
        style={{ border: "1px solid #ccc", width: "100%", height: "100%" }}
      ></iframe>
    </div>
  );
}

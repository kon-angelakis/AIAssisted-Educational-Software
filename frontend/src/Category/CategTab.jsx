import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CategTab({ text, categButtons }) {
  return (
    <div className="tab-container" style={{ width: "100vw" }}>
      <h1
        style={{
          textAlign: "center",
          paddingBottom: "10vh",
          paddingTop: "20vh",
          marginLeft: "15vw",
          marginRight: "15vw",
        }}
      >
        <ReactMarkdown
          children={text}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </h1>

      <div
        className="buttons-container"
        style={{
          width: "100vw",
          display: "flex",
          gap: "5vw",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {categButtons.map((categButton, index) => (
          <div key={index} className="button-item">
            {categButton}
          </div>
        ))}
      </div>
    </div>
  );
}

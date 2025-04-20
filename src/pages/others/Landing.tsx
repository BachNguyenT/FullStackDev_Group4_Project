function Landing() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "1rem",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        🚧 Under Construction 🚧
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
        }}
      >
        This section is currently under construction. Please check back later!
      </p>
    </div>
  );
}

export default Landing;

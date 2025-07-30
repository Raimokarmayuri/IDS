import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#121416", // dark background from image
        padding: "2rem",
        textAlign: "center",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          color: "#a8ff60", // green color from logo
          fontSize: "2.5rem",
          fontWeight: 600,
          marginBottom: "0.25rem",
        }}
      >
        [a]cache
      </div>
      <div style={{ fontSize: "1rem" }}>
        Copyright © 2025 Acache Technologies Private Limited. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

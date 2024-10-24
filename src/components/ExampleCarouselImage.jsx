import React from "react";

function ExampleCarouselImage({ text }) {
  return (
    <div
      style={{
        height: "400px",
        backgroundColor: "#777",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      <h3>{text}</h3>
    </div>
  );
}

export default ExampleCarouselImage;

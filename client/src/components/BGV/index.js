import Movies from "../Video/Movies.mp4";
import React from "react";

const BGV = () => {
  return (
    <video
      loop
      autoPlay
      muted
      style={{
        position: "absolute",
        width: "100%",
        // left:"50%",
        // top:"0%",
        height: "100%",
        objectFit: "cover",
        transform: "translation(-50%,-50%)",
        zIndex: "-1",
      }}
    >
      <source src={Movies} type="video/mp4" />
    </video>
  );
};

export default BGV;

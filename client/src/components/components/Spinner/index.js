import React from "react";
import spinner from "../../assets/img/spinner.gif";

export default function index() {
  return (
    <div
      style={{
        height: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <img src={spinner} alt="Loading..." style={{ margin: "auto" }} />
    </div>
  );
}

/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import pic from "../images/2090408.jpg";

const HomePage = () => {

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "48px" }}>
        Welcome to Emaily!!!
      </h1>
      <img
        src={pic}
        alt="picture"
        style={{
          maxHeight: "300px",
          maxWidth: "400px",
          textAlign: "center",
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          border: "9px solid #f3d9da",
          borderRadius: "25px",
        }}
      ></img>
    </div>
  );
};

export default HomePage;

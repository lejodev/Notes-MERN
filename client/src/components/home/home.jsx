import React from "react";

const home = () => {
  const titleArr = ["THE", "NOTES", "APP"];
  return (
    <div className="home">
      <div className="title">
        {titleArr.map((word) => (
          <span className="titleWord">{word}</span>
        ))}
      </div>
      <div className="login"></div>
      <div className="signupLink"></div>
    </div>
  );
};

export default home;

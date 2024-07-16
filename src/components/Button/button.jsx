import React from "react";
import "./button.css";

const Button = ({ text, onClick, blue, disabled=false }) => {
  return (
    <div>
      <button className={blue ? "btn btn-blue" : "btn"} onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

export default Button;

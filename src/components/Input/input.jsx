import React from "react";
import "./input.css";

const Input = ({ label, type, state, setState, placeholder, show = true }) => {
  return ( 
    <div className="input-label-wrapper">
      <p className="label">{label}</p>
     { show && <input
        type={type}
        className="input"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
      />}
    </div>
  );
};

export default Input;

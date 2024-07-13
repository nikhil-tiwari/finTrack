import React, { useState } from "react";
import Signup from "./signup";
import Signin from "./signin";
import "./signupsignin.css";

const MainComponent = () => {
  const [newUser, setNewUser] = useState(true);

  return (
    <div className="signup-wrapper">
      {newUser ? (
        <>
          <Signup />
          <p
            style={{
              textAlign: "center",
              marginBottom: 0,
              marginTop: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            Or Have An Account Already? <span onClick={() => setNewUser(!newUser)} style={{ cursor: "pointer", color: "var(--theme)" }}>Click Here</span>.
          </p>
        </>
      ) : (
        <>
          <Signin />
          <p
            style={{
              textAlign: "center",
              marginBottom: 0,
              marginTop: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            Or Don't Have An Account? <span onClick={() => setNewUser(!newUser)} style={{ cursor: "pointer", color: "var(--theme)" }}>Click Here</span>.
          </p>
        </>
      )}
    </div>
  );
};

export default MainComponent;

import React, { useEffect } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Spin } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const logoutfnc = () => {
    alert("Logout!");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Logged out successfully!");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        toast.error("Log out failed");
      });
  };

  return (
    <div className="navbar">
      <p className="logo">FinTrack</p>
      {loading ? (
        <Spin className="loading-spinner" />
      ) : (
        user && (
          <p className="logo link" onClick={logoutfnc}>
            Logout
          </p>
        )
      )}
    </div>
  );
};

export default Header;

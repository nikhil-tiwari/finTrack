import React, { useEffect } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Spin } from "antd";
import userSVG from "../../assets/user.svg";

const Header = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const logoutfnc = () => {
    // alert("Logout!");
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
          <div className="profile-wrapper">
            <div className="profile-img">
              <img src={user.photoURL ? user.photoURL : userSVG} alt="profile-img" />
            </div>
            <p className="logo link" onClick={logoutfnc}>
              Logout
            </p>
          </div>
          
        )
      )}
    </div>
  );
};

export default Header;

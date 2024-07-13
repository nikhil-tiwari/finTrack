import React, { useState } from "react";
import "./signupsignin.css";
import Input from "../Input/input";
import Button from "../Button/button";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signInEmail = (event) => {
    setLoading(true);
    event.preventDefault();
    console.log("Email:", email);
    console.log("Pasword:", password);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User:", user);
          toast.success("Logged in successfully");
          setLoading(false);
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log("Error code:", errorCode);
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };

  const signInGoogle = (event) => {
    event.preventDefault();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User:", user);
        console.log("Token:", token);
        setLoading(false);
        setEmail("");
        setPassword("");
        toast.success("Logged in successfully!");
        navigate("/dashboard");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setLoading(false);
        toast.error("Login failed:", errorMessage);
        console.log("Error code:", errorCode);
        // console.log("Error message:", errorMessage);
        console.log("Email:", email);
        console.log("Credential:", credential);
        // ...
      });
  };

  return (
    <>
      <p className="title">
        Sign in on <span style={{ color: "var(--theme)" }}>FinTrack</span>
      </p>
      <form>
        <Input
          type={"email"}
          label={"email"}
          state={email}
          setState={setEmail}
          placeholder={"johndoe@gmail.com"}
        />
        <Input
          type={"password"}
          label={"password"}
          state={password}
          setState={setPassword}
          placeholder={"********"}
        />
        <Button
          text={loading ? "Loading..." : "Sign in with Email and Password"}
          onClick={signInEmail}
          disabled={loading}
        />
        <p style={{ textAlign: "center", margin: 0 }}>or</p>
        <Button
          text={loading ? "Loading..." : "Sign in with Google"}
          onClick={signInGoogle}
          blue={true}
          disabled={loading}
        />
      </form>
    </>
  );
};

export default Signin;

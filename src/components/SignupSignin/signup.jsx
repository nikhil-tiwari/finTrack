import React, { useState } from "react";
import "./signupsignin.css";
import Input from "../Input/input";
import Button from "../Button/button";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { toast } from "react-toastify";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signUpEmail = (event) => {
    event.preventDefault();
    setLoading(true);
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            toast.success("User created successfully!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error code:", errorCode);
            console.log("Error message:", errorMessage);
            toast.error("User already exists!");
            setLoading(false);
          });
      } else {
        toast.error("Passwords does not match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };

  const signUpGoogle = (event) => {
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
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toast.success("Logged in successfully!");
        createDoc(user);
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

  const createDoc = async (user) => {
    if (!user) {
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName ? user.displayName : name,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : "",
        creationTime: user.metadata.creationTime,
      });
      toast.success("Document successfully written!");
    } catch (error) {
      console.log("Error writing document:", error);
      toast.error(error.message);
    }
    } else {
      toast.error("Document already exists");
    }
  };

  return (
    <>
      <p className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>FinTrack</span>
      </p>
      <form>
        <Input
          type={"text"}
          label={"full name"}
          state={name}
          setState={setName}
          placeholder={"John Doe"}
        />
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
        <Input
          type={"text"}
          label={"confirm password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"********"}
        />
        <Button
          text={loading ? "Loading..." : "Sign up with Email and Password"}
          onClick={signUpEmail}
          disabled={loading}
        />
        <p style={{ textAlign: "center", margin: 0 }}>or</p>
        <Button
          text={loading ? "Loading..." : "Sign up with Google"}
          blue={true}
          onClick={signUpGoogle}
          disabled={loading}
        />
      </form>
    </>
  );
};

export default Signup;

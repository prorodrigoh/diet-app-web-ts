// Phase 2

// User input email, password
// On click the Login button, if user exists, it will redirect to Home page
// If user doesn't exists, error message will show email/password incorrect

import { useState, useContext, FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVarContext } from "../App";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { initializeApp } from "@firebase/app";
import { Button, Input } from "@mui/material";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDNy_hyDSaDW0TqK_JWvBIsdbLAh3mf-o",
  authDomain: "my-first-firestore-rh.firebaseapp.com",
  projectId: "my-first-firestore-rh",
  storageBucket: "my-first-firestore-rh.appspot.com",
  messagingSenderId: "1085784748225",
  appId: "1:1085784748225:web:d61f9a9bdd2bb35b092440",
};

const connectAuth = () => {
  const app = initializeApp(firebaseConfig); // Initialize Firebase
  return getAuth(app); // Connect to Firebase/Authentication
};

export const Login: FC = () => {
  const { setLoggedUser } = useContext(GlobalVarContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();

  const handleLogin = () => {
    const auth = connectAuth();
    signInWithEmailAndPassword(auth, email!, password!) // Login with Firebase Authentication API
      .then((res) => setLoggedUser(res.user))
      .then(() => navigate("/home"))
      .catch(console.error);
  };

  const handleGoogleLogin = () => {
    const auth = connectAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => setLoggedUser(res.user))
      .catch(console.error);
  };

  return (
    <section style={{ padding: "2em" }}>
      <form onSubmit={handleLogin}>
        <Input
          //value={email}
          name="email"
          //onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          //value={password}
          name="password"
          //onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <Button type="submit">Login</Button>
        <Button onClick={handleGoogleLogin}>Google Login</Button>
      </form>
    </section>
  );
};

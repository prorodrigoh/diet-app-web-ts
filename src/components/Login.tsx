// Phase 2

// User input email, password
// On click the Login button, if user exists, it will redirect to Home page
// If user doesn't exists, error message will show email/password incorrect

import React, { useContext } from "react";
import { UserContext } from "../App";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Button, Input } from "@mui/material";

import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

export default function Login() {
  const { setUser } = useContext(UserContext);

  const handleLogin = ({ email, password }) => {
    const auth = connectAuth();
    signInWithEmailAndPassword(auth, email, password) // Login with Firebase Authentication API
      .then((res) => setUser(res.user))
      .catch(console.error);
  };

  const handleGoogleLogin = () => {
    const auth = connectAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => setUser(res.user))
      .catch(console.error);
  };

  return (
    <section style={{ padding: "2em" }}>
      <form>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="dense"
          />
        </Grid>

        <Button type="submit">Create User</Button>
        <Button onClick={handleGoogleLogin}>Google Login</Button>
      </form>
    </section>
  );
}

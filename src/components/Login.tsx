import { FC } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalVarContext } from "../App";
import { getUserByEmail } from "../services/user";
import { Copyright } from "./Copyright";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  connectAuthEmulator,
} from "@firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { resolve } from "path";
import { getCurrentWeekGoalByUser } from "../services/goal";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const Login: FC = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAUeHjWbC5d9d78T8316EDUxb4FccJHYGY",
    authDomain: "diet-app-web.firebaseapp.com",
    projectId: "diet-app-web",
    storageBucket: "diet-app-web.appspot.com",
    messagingSenderId: "644121539217",
    appId: "1:644121539217:web:d127f058e4223f06e4c530",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const { setLoggedUser, setGoogleUserObj, setNewUser } =
    React.useContext(GlobalVarContext);
  let navigate = useNavigate();

  const theme = createTheme();

  // const auth = connectAuthEmulator();
  // signInWithEmailAndPassword(auth, email!, password!) // Login with Firebase Authentication API
  //   .then((res) => setLoggedUser(res.user))
  //   .then(() => navigate("/dashboard"))
  //   .catch(console.error);

  const googleLogin = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(
          result
        ) as any;
        const gName = result.user.displayName as any;
        const arrName = gName.split(" ");
        const fName = arrName.shift();
        const lName = arrName.join(" ");
        let userObj = {
          uid: result.user.uid as any,
          googleName: gName,
          firstName: fName,
          lastName: lName,
          email: result.user.email as any,
          token: "",
        };
        setGoogleUserObj(userObj);
        return userObj;
      })
      .then((res) => {
        getUserByEmail(res.email).then((data) => {
          // check if user exists
          if (data._id) {
            // if it is a new user we setNewUser true
            getCurrentWeekGoalByUser(data._id.toString()).then((data) =>
              data.length === 0 ? setNewUser(true) : setNewUser(false)
            );
            setLoggedUser(data._id);
            navigate("/dashboard");
          } else {
            navigate("/signup");
          }
        });
      })
      .catch((error) => {
        const errorCode = error.errorCode;
        const errorMessage = error.errorMessage;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const emailAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as any;
    const password = data.get("password");
    const { _id } = await getUserByEmail(email);
    setLoggedUser(_id);
    navigate("/dashboard");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random/800x600/?food)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome to your Diet App
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={emailAuth}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Continue your journey
              </Button>
              <Button
                onClick={googleLogin}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Use your Google Account to continue your journey
              </Button>

              <Button
                onClick={handleSignup}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Start your journey now !
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

import { FC } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalVarContext } from "../App";
import { getUserByEmail } from "../services/user";
import { Copyright } from "./Copyright";

export const Login: FC = () => {
  const { setLoggedUser } = React.useContext(GlobalVarContext);
  let navigate = useNavigate();

  const theme = createTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const auth = connectAuth();
    // signInWithEmailAndPassword(auth, email!, password!) // Login with Firebase Authentication API
    //   .then((res) => setLoggedUser(res.user))
    //   .then(() => navigate("/home"))
    //   .catch(console.error);
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as any;
    const password = data.get("password");
    const { _id } = await getUserByEmail(email);
    setLoggedUser(_id);
    navigate("/dashboard");
    // navigate("/template");
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
              onSubmit={handleSubmit}
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
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Continue your journey
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

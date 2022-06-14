import { FC } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalVarContext } from "../App";
import { createUser, getUserByEmail } from "../services/user";
import { Container, MenuItem, Select } from "@mui/material";

export const Template: FC = () => {
  const { setLoggedUser, setNewUser } = React.useContext(GlobalVarContext);
  let navigate = useNavigate();
  const [ageGroup, setAgeGroup] = React.useState(0);

  const Copyright = (props: any) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/prorodrigoh/">
          @prorodrigoh
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  const theme = createTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email") as any;
    const firstName = data.get("firstName") as any;
    const lastName = data.get("lastName") as any;
    const ageGroup = data.get("ageGroup") as any;
    // const password = data.get("password") as any;

    const createdAt = new Date();
    createUser({
      createdAt,
      firstName,
      lastName,
      email,
      ageGroup,
    });

    const { _id } = await getUserByEmail(email);
    setLoggedUser(_id);
    setNewUser(true);
    navigate("/dashboard");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid> */}
              <Grid item xs={12}>
                <Select
                  fullWidth
                  labelId="demo-simple-select-filled-label"
                  id="ageGroup"
                  value={ageGroup}
                  name="ageGroup"
                  onChange={(e) => setAgeGroup(e.target.value as any)}
                >
                  <MenuItem value={0}>Select</MenuItem>
                  <MenuItem value={1}>10 to 18</MenuItem>
                  <MenuItem value={2}>19 to 30</MenuItem>
                  <MenuItem value={3}>31 to 60</MenuItem>
                  <MenuItem value={4}>60+</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignIn}
            >
              Already have an account? Sign in
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

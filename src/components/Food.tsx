import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { createFood } from "../services/food";
import { GlobalVarContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Copyright } from "./Copyright";

const theme = createTheme();

// Phase 1 - a
// Get last Body weight and calories goal from DB and populate the fields Previous weight/calories
// User input new values into the fields New Body Weight and New Calories Goal
// Save new values to DB

// As initial values, before the page CalculateGoal is done, the application will show 0 for both fields
// When the user signup we will create the first value as 0
// When the CalculateGoal page is done this will replace the first value

export const NewFood: FC = () => {
  const { loggedUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();

  if (!loggedUser) {
    navigate("/login");
  }

  const [foodName, setFoodName] = useState("");
  const [isoWeight, setIsoWeight] = useState(0);
  const [isoCalories, setIsoCalories] = useState(0);

  const postCreateFood = () => {
    const createdAt = new Date();
    const userId = loggedUser as any;
    const isoUnit = "g";
    createFood({
      createdAt,
      userId,
      foodName,
      isoWeight,
      isoCalories,
      isoUnit,
    });
    navigate("/daily");
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
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Typography component="h1" variant="h4" textAlign={"center"}>
                Add new foods not listed for daily calculations
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="foodName"
                label="Food Name"
                autoFocus
                name="foodName"
                placeholder="Food Name"
                // value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="isoWeight"
                label="ISO Weight (g)"
                name="isoWeight"
                placeholder="ISO Weight (g)"
                // value={isoWeight}
                onChange={(e) => setIsoWeight(e.target.value as any)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="isoCalories"
                label="ISO Calories"
                name="isoCalories"
                placeholder="ISO Calories"
                // value={isoWeight}
                onChange={(e) => setIsoCalories(e.target.value as any)}
              />

              {/* <Typography component="h1" variant="h6" textAlign={"center"}>
                Set your Goals for the week
              </Typography> */}

              {!foodName || !isoWeight || !isoCalories ? (
                <Button disabled>Save</Button>
              ) : (
                <Button
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  onClick={postCreateFood}
                  variant="contained"
                  component="span"
                  size="large"
                >
                  Save
                </Button>
              )}

              <Button
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/daily")}
                variant="contained"
                component="span"
                size="large"
              >
                Back
              </Button>
              <Button
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/dashboard")}
                variant="contained"
                component="span"
                size="large"
              >
                Dashboard
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

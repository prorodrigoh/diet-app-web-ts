import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Radio,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { GlobalVarContext } from "../App";
import { useNavigate } from "react-router-dom";
import { createGoal, getCurrentWeekGoalByUser } from "../services/goal";
import { getUserById } from "../services/user";
import { Copyright } from "./Copyright";

const theme = createTheme();

// Phase 1 - a
// Get last Body weight and calories goal from DB and populate the fields Previous weight/calories
// User input new values into the fields New Body Weight and New Calories Goal
// Save new values to DB

// As initial values, before the page CalculateGoal is done, the application will show 0 for both fields
// When the user signup we will create the first value as 0
// When the CalculateGoal page is done this will replace the first value

export const Goal: FC = () => {
  const { loggedUser, setNewUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();

  // if (!loggedUser) {
  //   navigate("/login");
  // }
  const [selectedGender, setSelectedGender] = useState("m");
  const [currentWeight, setCurrentWeight] = useState(-1);
  const [trainingFactor, setTrainingFactor] = useState(-1);

  let previousWeight: number = -1,
    previousCalories: number = -1,
    currentCalories: number = -1;

  const calculateGoals = async () => {
    let calculation = -1;
    const datauser = await getUserById(loggedUser);

    if (selectedGender === "m") {
      switch (datauser.ageGroup) {
        case 1:
          calculation = currentWeight * trainingFactor * 17.5 + 651;
          break;
        case 2:
          calculation = currentWeight * trainingFactor * 15.3 + 679;
          break;
        case 3:
          calculation = currentWeight * trainingFactor * 8.7 + 879;
          break;
        case 4:
          calculation = currentWeight * trainingFactor * 13.5 + 487;
          break;
        default:
          calculation = -9999;
          break;
      }
    } else {
      switch (datauser.ageGroup) {
        case 1:
          calculation = currentWeight * trainingFactor * 12.2 + 746;
          break;
        case 2:
          calculation = currentWeight * trainingFactor * 14.7 + 496;
          break;
        case 3:
          calculation = currentWeight * trainingFactor * 8.7 + 829;
          break;
        case 4:
          calculation = currentWeight * trainingFactor * 10.5 + 596;
          break;
        default:
          calculation = -9999;
          break;
      }
    }
    return calculation as number;
  };

  const createWeekGoal = async (userId: string) => {
    const id = await createGoal({
      userId,
      trainingFactor,
      previousWeight,
      previousCalories,
      currentWeight,
      currentCalories,
    });
    if (id) {
      setNewUser(false);
      return id;
    }
    console.log("createWeekGoal - Fail");
  };

  const checkIfWeekGoalExists = async () => {
    const dataBefore = await getCurrentWeekGoalByUser(loggedUser);
    // check if collection is empty
    if (dataBefore.length === 0) {
      console.log("checkIfWeekGoalExists - false");
      return false;
    }
    previousWeight = dataBefore[0].currentWeight;
    previousCalories = dataBefore[0].currentCalories;
    return true;
  };

  const handleGoals = async () => {
    // const createdAt = new Date();
    const userId = loggedUser as any;
    const result = await calculateGoals();
    currentCalories = Math.floor(result);

    const exists = await checkIfWeekGoalExists();
    // a way to block execution before previous await
    if (exists) {
      createWeekGoal(userId);
    } else {
      createWeekGoal(userId);
    }

    navigate("/dashboard");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(event.target.value);
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
                Let's calculate your weekly calories goal
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="currentWeight"
                label="Current Weight (Kg)"
                autoFocus
                name="currentWeight"
                placeholder="Current Weight (Kg)"
                onChange={(e) => setCurrentWeight(e.target.value as any)}
              />

              <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
                <p>
                  <Radio
                    checked={selectedGender === "m"}
                    onChange={handleChange}
                    value="m"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  MEN
                </p>
                <p>
                  <Radio
                    checked={selectedGender === "w"}
                    onChange={handleChange}
                    value="w"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "B" }}
                  />
                  WOMEN
                </p>
              </FormControl>

              <Typography component="h1" variant="h6" textAlign={"center"}>
                Physical Activity Level
              </Typography>
              {selectedGender === "m" ? (
                <Select
                  fullWidth
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={trainingFactor}
                  onChange={(e) => setTrainingFactor(e.target.value as any)}
                >
                  <MenuItem value={-1}>Select an option</MenuItem>
                  <MenuItem value={1.2}>No extra activity</MenuItem>
                  <MenuItem value={1.3}>Less than 3x a week</MenuItem>
                  <MenuItem value={1.35}>
                    3x per week at least 30 minutes
                  </MenuItem>
                  <MenuItem value={1.45}>
                    3x per week at least 60 minutes
                  </MenuItem>
                  <MenuItem value={1.5}>Daily between 1 and 3 hours</MenuItem>
                  <MenuItem value={1.7}>Daily for more than 3 hours</MenuItem>
                </Select>
              ) : (
                <Select
                  fullWidth
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={trainingFactor}
                  onChange={(e) => setTrainingFactor(e.target.value as any)}
                >
                  <MenuItem value={-1}>Select an option</MenuItem>
                  <MenuItem value={1.2}>No extra activity</MenuItem>
                  <MenuItem value={1.3}>Less than 3x a week</MenuItem>
                  <MenuItem value={1.4}>
                    3x per week at least 30 minutes
                  </MenuItem>
                  <MenuItem value={1.5}>
                    3x per week at least 60 minutes
                  </MenuItem>
                  <MenuItem value={1.6}>Daily between 1 and 3 hours</MenuItem>
                  <MenuItem value={1.8}>Daily for more than 3 hours</MenuItem>
                </Select>
              )}

              {/* <Typography component="h1" variant="h6" textAlign={"center"}>
                Set your Goals for the week
              </Typography> */}

              {currentWeight === -1 || trainingFactor === -1 ? (
                <Button disabled>Save</Button>
              ) : (
                <Button
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleGoals}
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

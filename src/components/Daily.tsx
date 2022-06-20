import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import { createFoodCPW } from "../services/cpw";
import {
  createDailyGoal,
  getCurrentDailyGoalByUser,
  updateCaloriesDailyGoal,
} from "../services/dailygoal";
import { getCurrentWeekGoalByUser } from "../services/goal";
import { Food, getAllFoodsByUser, getFoodById } from "../services/food";
import { useNavigate } from "react-router-dom";
import { GlobalVarContext } from "../App";
import { Copyright } from "./Copyright";

const theme = createTheme();

export const Daily: React.FC = () => {
  const { loggedUser } = React.useContext(GlobalVarContext);
  let navigate = useNavigate();
  const [foodWeight, setFoodWeight] = React.useState(0);
  const [foodId, setFoodId] = React.useState("");
  const [foods, setFoods] = React.useState<Food[]>([]);
  let foodCalories = 0,
    difference = 0,
    newDaystoWeightIn = 0;

  if (!loggedUser) {
    navigate("/login");
  }

  React.useEffect(() => {
    getAllFoodsByUser(loggedUser).then(setFoods);
  }, [loggedUser]);

  const handleInputWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFoodWeight((event.target as HTMLInputElement).value as any);
  };

  const handleRadioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFoodId((event.target as HTMLInputElement).value);
  };

  // ------------------------------------------------------------------ Calculate the difference between two dates
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  // a = TODAY
  // b = a date BEFORE today

  const dateDiffInDays = (a: Date, b: Date) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    // console.log("today:", a);
    // console.log("createdAt:", b);
    // console.log(Math.floor((utc1 - utc2) / _MS_PER_DAY));

    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
  };

  // ------------------------------------------------------------------ Calculate the new amount of calories
  const calculateCPW = async () => {
    const data = await getFoodById(foodId);
    foodCalories = Math.floor((foodWeight * data.isoCalories) / data.isoWeight);
    // console.log("CPW - foodcalories", foodCalories);
  };

  // ------------------------------------------------------------------ Check DailyGoal
  // every time we add a food to daily consumption
  // we check if a daily goal is set.

  const checkIfDailyGoalExists = async () => {
    const dataBefore = await getCurrentDailyGoalByUser(loggedUser);
    // check if it a new WeekGoal - if so, addNewDailyGoal
    if (dataBefore.length === 0) {
      return 0;
    }
    difference = dateDiffInDays(new Date(), new Date(dataBefore[0].createdAt));
    newDaystoWeightIn = dataBefore[0].daysToWeightIn - difference;
    // check if the day has passed - if so, addNextDailyGoal
    if (difference !== 0) {
      return 1;
    }
    // not a new goal - day hasn't passed - updateDailyGoal
    return 2;
  };

  // happens ONLY after creating a new weekgoal
  const addNewDailyGoal = async () => {
    const data = await getCurrentWeekGoalByUser(loggedUser);
    const goalId = data[0]._id;
    const dailyCalories = Math.floor(data[0].currentCalories - foodCalories); //foodcalories comes from calculateCPW
    const daysToWeightIn = 7;
    // console.log(
    //   "addNewDailyGoal - createDailyGoal",
    //   goalId,
    //   dailyCalories,
    //   daysToWeightIn
    // );
    createDailyGoal({
      goalId,
      dailyCalories,
      daysToWeightIn,
    });
  };

  // Happens when the date changes - we create a new doc with DaysToWeightIn = Previous DaysToWeightIn - 1
  const addNextDailyGoal = async () => {
    const data = await getCurrentWeekGoalByUser(loggedUser);
    // console.log(data[0]);
    const goalId = data[0]._id;
    const dailyCalories = Math.floor(data[0].currentCalories - foodCalories); //foodcalories comes from calculateCPW
    const daysToWeightIn = newDaystoWeightIn;

    // console.log(
    //   "addNextDailyGoal - createDailyGoal",
    //   goalId,
    //   dailyCalories,
    //   daysToWeightIn
    // );
    createDailyGoal({
      goalId,
      dailyCalories,
      daysToWeightIn,
    });
  };

  // if a daily goal exists
  // we subtract the food calories from it

  const updateDailyGoal = async () => {
    const data = await getCurrentDailyGoalByUser(loggedUser);

    const goalId = data[0]._id;
    const dailyCalories = Math.floor(data[0].dailyCalories - foodCalories); //foodcalories comes from calculateCPW
    // console.log("updateDailyGoal", goalId, dailyCalories);
    const resultUpd = await updateCaloriesDailyGoal(goalId, dailyCalories);
  };

  const handleCreateCPW = async () => {
    // make the calculations based on the input
    calculateCPW();

    const exists = await checkIfDailyGoalExists();
    try {
      if (exists === 0) {
        // console.log("addNewDailyGoal");
        addNewDailyGoal();
      }

      if (exists === 2) {
        // console.log("updateDailyGoal");
        updateDailyGoal();
      }

      if (exists === 1) {
        // console.log("addNextDailyGoal");
        addNextDailyGoal();
      }
    } catch (err) {
      return console.log(err, { message: "error handle create cpw" });
    }

    // if the CPW is there, we just need to update the value
    const createdAt = new Date();
    createFoodCPW({
      createdAt,
      foodId,
      foodWeight,
      foodCalories,
    });

    navigate("/dashboard");
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
            <Typography component="h1" variant="h4" textAlign={"center"}>
              Here's a list of foods that you've already created
            </Typography>
            <br />
            <Typography component="h1" variant="h6" textAlign={"center"}>
              Select one, add how much you are eating and click on add food to
              use it
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={foodId}
                  onChange={handleRadioSelect}
                >
                  {foods.map((food) => {
                    return (
                      <FormControlLabel
                        key={food._id}
                        value={food._id}
                        control={<Radio />}
                        label={food.foodName}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                id="foodWeight"
                label="Food Weight (g)"
                autoFocus
                name="foodWeight"
                placeholder="Food Weight (g)"
                onChange={handleInputWeight}
              />
              {!foodWeight || !foodId ? (
                <Button disabled>Add Food</Button>
              ) : (
                <Button
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleCreateCPW}
                  variant="contained"
                  component="span"
                  size="large"
                >
                  Add Food
                </Button>
              )}
              <Typography component="h1" variant="h6" textAlign={"center"}>
                If your food is not on the list
              </Typography>
              <Button
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/food")}
                variant="contained"
                component="span"
                size="large"
              >
                Create New Food
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

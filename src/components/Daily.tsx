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
  let foodCalories = 0;

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

  const calculateCPW = async () => {
    const data = await getFoodById(foodId);
    foodCalories = (foodWeight * data.isoCalories) / data.isoWeight;
  };

  // every time we add a food to daily consumption
  // we check if a daily goal is set.

  const checkIfDailyGoalExists = async () => {
    const dataBefore = await getCurrentDailyGoalByUser(loggedUser);
    if (dataBefore.length === 0) {
      return false;
    }
    return true;
  };

  // if it is not, we create it

  const addNewDailyGoal = async () => {
    const data = await getCurrentWeekGoalByUser(loggedUser);
    const goalId = data[0]._id;

    const dailyCalories = Math.floor(data[0].currentCalories - foodCalories); //foodcalories comes from calculateCPW
    const daysToWeightIn = 7;

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
    // console.log(goalId, data[0].dailyCalories, foodCalories, dailyCalories);
    const resultUpd = await updateCaloriesDailyGoal(goalId, dailyCalories);
    // console.log("Daily.tsx:", resultUpd);
  };

  const handleCreateCPW = async () => {
    // make the calculations based on the input
    calculateCPW();
    const exists = await checkIfDailyGoalExists();
    try {
      if (exists) {
        console.log("update");
        updateDailyGoal();
      } else {
        console.log("create");
        addNewDailyGoal();
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
              {!foodWeight ? (
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

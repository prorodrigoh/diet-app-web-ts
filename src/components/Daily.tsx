import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVarContext } from "../App";
import { Food, getAllFoodsByUser, getFoodById } from "../services/food";
import { createCPW } from "../services/cpw";
import { getCurrentWeekGoalByUser } from "../services/goal";
import { createDailyGoal } from "../services/dailygoal";

// Phase 1
// Page will display Current weight, Daily Calories Goal, Days until next weight-in
// Page will display Calories left today that will be calculated based on the foods logged in
// Page will display a dropdown list with buttons with food names consumed.

// Page will display a mini chart with the calories variation of the week ! ! ! ! ! ! ! !

// On click, the buttons will expand with the Consumed weight and calories of that food
// On click Add Food Button, the user will be redirected to the Add Food page (Food.js)
// On click Set Goal Button, the user will be redirected to the Set Goal Page (Goal.js)
// On click Chart Button, the user will be redirected to the Chart Page (Chart.js)

export const Daily: FC = () => {
  const { loggedUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();
  const [foodWeight, setFoodWeight] = useState(0);
  const [foodId, setFoodId] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);
  let foodCalories = 0;

  if (!loggedUser) {
    navigate("/login");
  }

  useEffect(() => {
    getAllFoodsByUser(loggedUser).then(setFoods);
  }, []);

  const handleInputWeight = (event: ChangeEvent<HTMLInputElement>) => {
    setFoodWeight((event.target as HTMLInputElement).value as any);
  };

  const handleRadioSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setFoodId((event.target as HTMLInputElement).value);
  };

  const calculateCPW = async () => {
    const data = await getFoodById(foodId);
    foodCalories = (foodWeight * data.isoCalories) / data.isoWeight;
  };

  // every time we add a food to daily consumption
  // we check if a daily goal is set.

  const checkIfDailyGoalExists = async () => {
    const dataBefore = await getCurrentWeekGoalByUser(loggedUser);
    if (!dataBefore) {
      return false;
    }
    return true;
  };

  // if it is not, we create it

  const createDayGoal = async () => {
    const data = await getCurrentWeekGoalByUser(loggedUser);
    const goalId = data[0]._id;

    const dailyCalories = data[0].currentCalories - foodCalories;
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
    //
  };

  const handleCreateCPW = async () => {
    calculateCPW();
    const exists = await checkIfDailyGoalExists();
    if (exists) {
      updateDailyGoal();
    } else {
      createDayGoal();
    }

    const createdAt = new Date();
    createCPW({
      createdAt,
      foodId,
      foodWeight,
      foodCalories,
    });
    navigate("/dashboard");
  };

  return (
    <>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <FormLabel id="radio-buttons-group-label">
            Here's a list of foods that you've already created
          </FormLabel>
          <FormLabel id="radio-buttons-group-label">
            Select one, add how much you are eating and click on add food to use
            it
          </FormLabel>
        </FormControl>
      </div>
      <div>
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
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <Input
            name="foodWeight"
            placeholder="Food Weight (g)"
            onChange={handleInputWeight}
          />
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          {!foodWeight ? (
            <Button disabled>Add Food</Button>
          ) : (
            <Button
              onClick={handleCreateCPW}
              variant="contained"
              component="span"
              size="large"
            >
              Add Food
            </Button>
          )}
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <p>If your food is not on the list:</p>
          <Button
            onClick={() => navigate("/food")}
            variant="contained"
            component="span"
            size="large"
          >
            Create New Food
          </Button>
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <p></p>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="contained"
            component="span"
            size="large"
          >
            Dashboard
          </Button>
        </FormControl>
      </div>
    </>
  );
};

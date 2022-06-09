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
  }, [foods]);

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

  const handleCreateCPW = () => {
    calculateCPW();
    const createdAt = Date.now();
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
        <FormControl>
          <FormLabel id="radio-buttons-group-label">
            List of foods already in the DB - Click to select, add Food Weight
            to add to the daily consumption
          </FormLabel>
          <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            name="radio-buttons-group"
            value={foodId}
            onChange={handleRadioSelect}
          >
            {foods.map((food) => {
              return (
                <FormControlLabel
                  key={food.createdAt}
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
        <>
          <Input
            name="foodWeight"
            placeholder="Food Weight (g)"
            onChange={handleInputWeight}
          />
          {!foodWeight ? (
            <Button disabled>Add Food</Button>
          ) : (
            <Button onClick={handleCreateCPW}>Add Food</Button>
          )}
        </>
      </div>
      <div>
        <p>If your food is not on the list:</p>
        <Button onClick={() => navigate("/food")}>Create New Food</Button>
      </div>
    </>
  );
};

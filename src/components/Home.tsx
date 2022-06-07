import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Food,
  getAllFoods,
  getAllFoodsByUser,
  getFoodById,
} from "../services/food";
import { GlobalVarContext } from "../App";
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

export const Home: FC = () => {
  const { loggedUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();
  const [foodWeight, setFoodWeight] = useState(0);
  const [isoWeight, setIsoWeight] = useState(0);
  const [foodCalories, setFoodCalories] = useState(0);
  const [isoCalories, setIsoCalories] = useState(0);
  const [foodId, setFoodId] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    // getAllFoodsByUser(loggedUser).then((e) => (!e ? setFoods : console.log(e)));
    getAllFoods().then(setFoods);
  }, [foods]);

  useEffect(() => {
    calculateCPW();
  }, [foodWeight]);

  const handleInputWeight = (event: ChangeEvent<HTMLInputElement>) => {
    setFoodWeight((event.target as HTMLInputElement).value as any);
    console.log("handleInputWeight: ", foodWeight);
  };

  const handleRadioSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setFoodId((event.target as HTMLInputElement).value);
    console.log("handleRadioSelect: ", foodId);
  };

  const calculateCPW = async () => {
    const data = await getFoodById(foodId);
    setFoodCalories((foodWeight * data.isoCalories) / data.isoWeight);
    setIsoWeight(data.isoWeight);
    setIsoCalories(data.isoCalories);
    console.log(foodId, foodCalories, foodWeight, isoCalories, isoWeight);
  };

  const handleCreateCPW = async () => {
    await calculateCPW;
    const createdAt = Date.now();
    await createCPW({
      createdAt,
      foodId,
      foodWeight,
      foodCalories,
    });
  };

  return (
    <>
      <div>
        <p>Dashboard</p>
        <p>Days until next weight in</p>
        {/* Will show here variable daysLeft coming from GOAL. Set when create new goal and decreased by one every day.  */}
        <p>Current Weight</p>
        {/* Will show here a currentWeight coming from GOAL  */}
        <p>Daily Calories Goal</p>
        {/* Will show here a dailyCalories coming from GOAL */}
        <p>Calories left for today</p>
        {/* Will show here a local variable caloriesLeft that will be equal to dailyCalories coming from GOAL but will be subtracted from variable foodCalories. When local time changes to next day,caloriesLeft resets to dailyCalories */}
      </div>
      <div>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            List of foods already in the DB - Click to select, add Food Weight
            to add to the daily consumption
          </FormLabel>
          <RadioGroup
            aria-labelledby="radio-buttons-group"
            name="radio-buttons-group"
            // value={value}
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
        {/* <List>
          {foods.map((food, index) => {
            return (
              <ListItem key={food._id}>
                {food.foodName +
                  ": " +
                  food.isoWeight +
                  "g & " +
                  food.isoCalories +
                  "cal"}
              </ListItem>
            );
          })}
        </List> */}
      </div>
      <div>
        <Input
          name="foodWeight"
          placeholder="Food Weight (g)"
          onChange={handleInputWeight}
          // onChange={(e) => setFoodWeight(e.target.value as any)}
        />
        <TextField
          id="outlined-read-only-input"
          label="Calculated Calories"
          defaultValue={foodCalories + " cal"}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button onClick={handleCreateCPW}>Add Food</Button>
      </div>
      <div>
        <Button onClick={() => navigate("/food")}>Create New Food</Button>
        <Button onClick={() => navigate("/goal")}>Set Goal</Button>
        <Button onClick={() => navigate("/chart")}>Charts</Button>
      </div>
    </>
  );
};

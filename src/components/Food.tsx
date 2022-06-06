// Phase 1 - b

// Input field Weight Consumed is mandatory and when it is set, food buttons and create new are // enabled

// If food exists
// On click any food button, it will calculate the amount of calories with the formula ( Weight Consumed * Standard Calories / Standard Weight ) and the result will show on the field Calculated Calories
// the button to add to daily list will be enabled
// On click Add to daily list, it will save the calories consumed, the food and weight consumed to the DB

// If food doesn't exists
// User input Food Name, Food Standard Calories, Food Standard Weight
// the application will show the result on the Calculated Calories field
// On click Create New and Add to daily list
// the application will create a new food on the users DB
// the application will save the calories consumed, the food and weight consumed to the DB

import { Button, Input } from "@mui/material";
import { FC, FormEvent, useContext, useState } from "react";
import { createFood } from "../services/food";
import { GlobalVarContext } from "../App";
import { useNavigate } from "react-router-dom";

export const NewFood: FC = () => {
  const { loggedUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();

  if (!loggedUser) {
    navigate("/login");
  }

  const [foodName, setFoodName] = useState("");
  const [isoWeight, setIsoWeight] = useState(0);
  const [isoCalories, setIsoCalories] = useState(0);
  const [isoUnit, setIsoUnit] = useState("g");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const createdAt = Date.now();
    const userId = loggedUser as any;
    await createFood({
      createdAt,
      userId,
      foodName,
      isoWeight,
      isoCalories,
      isoUnit,
    });
    navigate("/home");
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <Input
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="Food Name"
        />
        <Input
          value={isoWeight}
          onChange={(e) => setIsoWeight(e.target.value as any)}
          placeholder="ISO Weight"
        />
        <Input
          value={isoCalories}
          onChange={(e) => setIsoCalories(e.target.value as any)}
          placeholder="Year"
        />
      </div>
      <Button type="submit">Create Food</Button>
    </form>
  );
};

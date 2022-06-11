//
//  >>>>>>>>>>>>>>>>>>>>>>>>    TESTED - It is inserting correctly into DB
//

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
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
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <Input
          name="foodName"
          placeholder="Food Name"
          // value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <Input
          name="isoWeight"
          placeholder="ISO Weight (g)"
          // value={isoWeight}
          onChange={(e) => setIsoWeight(e.target.value as any)}
        />
        <Input
          name="isoCalories"
          placeholder="ISO Calories"
          // value={isoCalories}
          onChange={(e) => setIsoCalories(e.target.value as any)}
        />
      </div>
      <p>
        If your food is not listed for calculations
        <Button type="submit">Create Food</Button>
      </p>
    </form>
  );
};

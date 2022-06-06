import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

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
  let navigate = useNavigate();

  return (
    <>
      <p>Dashboard</p>
      <Button onClick={() => navigate("/food")}>Add Food</Button>
      <Button onClick={() => navigate("/goal")}>Set Goal</Button>
      <Button onClick={() => navigate("/chart")}>Charts</Button>
    </>
  );
};

import { Button } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVarContext } from "../App";

export const Dashboard: FC = () => {
  const { loggedUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();
  return (
    <>
      <div>
        <p>Welcome to your Dashboard</p>
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
        <p>
          Add a food that you have eaten to calculate your numbers for the day
          <Button onClick={() => navigate("/daily")}>Add food</Button>
        </p>
        <p>
          Set your goals for the week accordingly to your current weight
          <Button onClick={() => navigate("/goal")}>Set Goal</Button>
        </p>
        <p>
          Check your charts to see your progress across time
          <Button onClick={() => navigate("/chart")}>Charts</Button>
        </p>
      </div>
    </>
  );
};

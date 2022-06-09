import { Button } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVarContext } from "../App";
import { DailyGoal, getCurrentDailyGoalByUser } from "../services/dailygoal";
import { getCurrentGoalByUser, Goal } from "../services/goal";

export const Dashboard: FC = () => {
  const { loggedUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();

  // const [weekGoal, setWeekGoal] = useState();
  // const [dailyGoal, setDailyGoal] = useState();

  if (!loggedUser) {
    navigate("/login");
  }
  // useEffect(() => {
  //   console.log("Dashboard.tsx - dailyGoal", dailyGoal);
  // }, []);
  // useEffect(() => {
  //   console.log("Dashboard.tsx - weekGoal", weekGoal);
  // }, []);

  // useEffect(() => {
  //   getCurrentGoalByUser(loggedUser).then((data) => setWeekGoal(data));
  // }, []);

  // useEffect(() => {
  //   getCurrentDailyGoalByUser(loggedUser).then((data) => setDailyGoal(data));
  // }, []);

  return (
    <>
      <div>
        <p>Welcome to your Dashboard</p>
        <p>Current Weight</p>
        {/* {weekGoal.currentWeight} */}
        <p>Daily Calories Goal</p>
        {/* {weekGoal.currentCalories} */}
        <p>Days until next weight in</p>
        {/* {dailyGoal.daysToWeightIn} */}
        <p>Calories left for today</p>
        {/* {dailyGoal?.dailyCalories} */}
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
        {/* <p>
          Check your charts to see your progress across time
          <Button onClick={() => navigate("/chart")}>Charts</Button>
        </p> */}
      </div>
    </>
  );
};

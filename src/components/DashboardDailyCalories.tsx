import * as React from "react";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentDailyGoalByUser } from "../services/dailygoal";
import { getCurrentWeekGoalByUser } from "../services/goal";
import Typography from "@mui/material/Typography";
import Title from "./DashboardTitle";
import { GlobalVarContext } from "../App";

export const DashboardDailyCalories: FC = () => {
  const { loggedUser, newUser, setChartDailyCalories, setChartDaysToWeightIn } =
    useContext(GlobalVarContext);
  let navigate = useNavigate();
  const [displayCurrentWeight, setDisplayCurrentWeight] = useState(0);
  const [displayCurrentCalories, setDisplayCurrentCalories] = useState(0);
  const [displayDaysToWeightIn, setDisplayDaysToWeightIn] = useState(0);
  const [displayCaloriesLeft, setDisplayCaloriesLeft] = useState(0);

  if (!loggedUser) {
    navigate("/login");
  }

  const stats = async () => {
    // weekgoal
    if (!newUser) {
      const dataWeek = await getCurrentWeekGoalByUser(loggedUser);
      setDisplayCurrentWeight(dataWeek[0].currentWeight);
      setDisplayCurrentCalories(dataWeek[0].currentCalories);
      setChartDaysToWeightIn(dataWeek[0].currentWeight);
      // dailygoal
      const dataDay = await getCurrentDailyGoalByUser(loggedUser);
      setDisplayDaysToWeightIn(dataDay[0].daysToWeightIn);
      setDisplayCaloriesLeft(dataDay[0].dailyCalories);
      setChartDailyCalories(dataDay[0].dailyCalories);
    }
  };

  React.useEffect(() => {
    stats();
  }, []);

  return (
    <React.Fragment>
      <Title>Current Weight (Kg/Lbs)</Title>
      <Typography component="p" variant="h4" textAlign={"center"}>
        {displayCurrentWeight}/{Math.floor(displayCurrentWeight * 2.20462)}
      </Typography>
      <Title>Days until next weight in</Title>
      <Typography component="p" variant="h4" textAlign={"center"}>
        {displayDaysToWeightIn}
      </Typography>
      <Title>Calories Per Day Goal</Title>
      <Typography component="p" variant="h4" textAlign={"center"}>
        {displayCurrentCalories}
      </Typography>
      <div></div>
      <Title>Calories Left for Today</Title>
      <Typography component="p" variant="h4" textAlign={"center"}>
        {displayCaloriesLeft}
      </Typography>
    </React.Fragment>
  );
};

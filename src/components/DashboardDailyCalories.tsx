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

  // ------------------------------------------------------------------ Calculate the difference between two dates
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  // a = TODAY
  // b = a date BEFORE today

  const dateDiffInDays = (a: Date, b: Date) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    // console.log("today:", a);
    // console.log("createdAt:", b);
    // console.log(Math.floor((utc1 - utc2) / _MS_PER_DAY));

    return Math.floor((utc1 - utc2) / _MS_PER_DAY);
  };

  const stats = async () => {
    // weekgoal
    if (!newUser) {
      const dataWeek = await getCurrentWeekGoalByUser(loggedUser);
      setDisplayCurrentWeight(dataWeek[0].currentWeight);
      setDisplayCurrentCalories(dataWeek[0].currentCalories);
      // setChartDaysToWeightIn(dataWeek[0].currentWeight);

      // get the last entry in the dailyGoal
      const dataDay = await getCurrentDailyGoalByUser(loggedUser);
      // verify how many day have passed since
      const lastEntry = dateDiffInDays(
        new Date(),
        new Date(dataDay[0].createdAt)
      );

      // check if the last Daily goal if NOT from TODAY
      if (dataDay && lastEntry !== 0) {
        // if so, we use the GOAL calories
        setDisplayCaloriesLeft(dataWeek[0].currentCalories);
        // set the number of days to weight in to the difference
        setDisplayDaysToWeightIn(dataDay[0].daysToWeightIn - lastEntry);
        return;
      }

      // dailygoal if it is from the same day
      setDisplayDaysToWeightIn(dataDay[0].daysToWeightIn);
      setDisplayCaloriesLeft(dataDay[0].dailyCalories);
      // setChartDailyCalories(dataDay[0].dailyCalories);
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

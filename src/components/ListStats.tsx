import { FormControl, FormLabel } from "@mui/material";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVarContext } from "../App";
import { getCurrentDailyGoalByUser } from "../services/dailygoal";
import { getCurrentWeekGoalByUser } from "../services/goal";
import { getUserById } from "../services/user";

export const ListStats: FC = () => {
  const { loggedUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();
  const [displayName, setDisplayName] = useState("display not set");
  const [displayCurrentWeight, setDisplayCurrentWeight] = useState(0);
  const [displayCurrentCalories, setDisplayCurrentCalories] = useState(0);
  const [displayDaysToWeightIn, setDisplayDaysToWeightIn] = useState(0);
  const [displayCaloriesLeft, setDisplayCaloriesLeft] = useState(0);

  if (!loggedUser) {
    navigate("/login");
  }

  const stats = async () => {
    const { firstName, lastName } = await getUserById(loggedUser);
    setDisplayName(firstName + " " + lastName);
    // weekgoal
    const dataWeek = await getCurrentWeekGoalByUser(loggedUser);
    setDisplayCurrentWeight(dataWeek[0].currentWeight);
    setDisplayCurrentCalories(dataWeek[0].currentCalories);
    // dailygoal
    const dataDay = await getCurrentDailyGoalByUser(loggedUser);
    setDisplayDaysToWeightIn(dataDay[0].daysToWeightIn);
    setDisplayCaloriesLeft(dataDay[0].dailyCalories);
  };

  stats();
  return (
    <>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <FormLabel>Welcome {displayName} to your Dashboard</FormLabel>
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <FormLabel>This week's starting Weight</FormLabel>
          <FormLabel>{displayCurrentWeight} Kg</FormLabel>
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <FormLabel>This week's Calories per day Goal</FormLabel>
          <FormLabel>{displayCurrentCalories} Cal/Day</FormLabel>
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <FormLabel>Days until next weight in</FormLabel>
          <FormLabel>{displayDaysToWeightIn}</FormLabel>
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <FormLabel>Calories left for today</FormLabel>
          <FormLabel>{displayCaloriesLeft}</FormLabel>
        </FormControl>
      </div>
    </>
  );
};

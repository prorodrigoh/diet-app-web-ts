import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  Select,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { GlobalVarContext } from "../App";
import { useNavigate } from "react-router-dom";
import { createGoal, getCurrentGoalByUser } from "../services/goal";
import { getUserById } from "../services/user";
import { createDailyGoal } from "../services/dailygoal";

// Phase 1 - a
// Get last Body weight and calories goal from DB and populate the fields Previous weight/calories
// User input new values into the fields New Body Weight and New Calories Goal
// Save new values to DB

// As initial values, before the page CalculateGoal is done, the application will show 0 for both fields
// When the user signup we will create the first value as 0
// When the CalculateGoal page is done this will replace the first value

export const Goal: FC = () => {
  const { loggedUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();

  if (!loggedUser) {
    navigate("/login");
  }

  const [goalId, setGoalId] = useState("");
  const [previousWeight, setPreviousWeight] = useState(0);
  const [previousCalories, setPreviousCalories] = useState(0);
  const [currentCalories, setCurrentCalories] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [daysToWeightIn, setDaysToWeightIn] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [selectedGender, setSelectedGender] = useState("m");
  const [trainingFactor, setTrainingFactor] = useState(0);

  const calculateGoals = async () => {
    const datauser = await getUserById(loggedUser);

    if (selectedGender === "m") {
      switch (datauser.ageGroup) {
        case 1:
          setCurrentCalories(currentWeight * trainingFactor * 17.5 + 651);
          break;
        case 2:
          setCurrentCalories(currentWeight * trainingFactor * 15.3 + 679);
          break;
        case 3:
          setCurrentCalories(currentWeight * trainingFactor * 8.7 + 879);
          break;
        case 4:
          setCurrentCalories(currentWeight * trainingFactor * 13.5 + 487);
          break;
        default:
          setCurrentCalories(-9999);
          break;
      }
    } else {
      switch (datauser.ageGroup) {
        case 1:
          setCurrentCalories(currentWeight * trainingFactor * 12.2 + 746);
          break;
        case 2:
          setCurrentCalories(currentWeight * trainingFactor * 14.7 + 496);
          break;
        case 3:
          setCurrentCalories(currentWeight * trainingFactor * 8.7 + 829);
          break;
        case 4:
          setCurrentCalories(currentWeight * trainingFactor * 10.5 + 596);
          break;
        default:
          setCurrentCalories(-9999);
          break;
      }
    }
  };

  const handleGoals = async () => {
    const createdAt = Date.now();
    const userId = loggedUser as any;
    const data = await getCurrentGoalByUser(loggedUser);
    setGoalId(data[0]._id);
    setPreviousWeight(data[0].currentWeight);
    setPreviousCalories(data[0].currentCalories);

    calculateGoals();

    // createGoal({
    //   createdAt,
    //   userId,
    //   trainingFactor,
    //   previousWeight,
    //   previousCalories,
    //   currentWeight,
    //   currentCalories,
    // });
    console.log("createGoal", {
      createdAt,
      userId,
      trainingFactor,
      previousWeight,
      previousCalories,
      currentWeight,
      currentCalories,
    });

    setDailyCalories(currentCalories); // will subtract from dailyCalories
    setDaysToWeightIn(7);

    // createDailyGoal({
    //   createdAt,
    //   goalId,
    //   dailyCalories,
    //   daysToWeightIn,
    // });
    console.log("createDailyGoal", {
      createdAt,
      goalId,
      dailyCalories,
      daysToWeightIn,
    });
    // navigate("/dashboard");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(event.target.value);
  };

  return (
    <>
      <div>
        <FormControl>
          <FormLabel id="goal-form">
            Calculate your calories intake daily goal
          </FormLabel>
          <Input
            name="currentWeight"
            placeholder="Current Weight (Kg)"
            onChange={(e) => setCurrentWeight(e.target.value as any)}
          />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <p>
            <Radio
              checked={selectedGender === "m"}
              onChange={handleChange}
              value="m"
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
            />
            MEN
          </p>
          <p>
            <Radio
              checked={selectedGender === "w"}
              onChange={handleChange}
              value="w"
              name="radio-buttons"
              inputProps={{ "aria-label": "B" }}
            />
            WOMEN
          </p>
        </FormControl>
      </div>
      <div>
        {selectedGender === "m" ? (
          <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Physical Activity Level
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={trainingFactor}
              onChange={(e) => setTrainingFactor(e.target.value as any)}
            >
              <MenuItem value={1.2}>No extra activity</MenuItem>
              <MenuItem value={1.3}>Less than 3x a week</MenuItem>
              <MenuItem value={1.35}>3x per week at least 30 minutes</MenuItem>
              <MenuItem value={1.45}>3x per week at least 60 minutes</MenuItem>
              <MenuItem value={1.5}>Daily between 1 and 3 hours</MenuItem>
              <MenuItem value={1.7}>Daily for more than 3 hours</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Physical Activity Level
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={trainingFactor}
              onChange={(e) => setTrainingFactor(e.target.value as any)}
            >
              <MenuItem value={1.2}>No extra activity</MenuItem>
              <MenuItem value={1.3}>Less than 3x a week</MenuItem>
              <MenuItem value={1.4}>3x per week at least 30 minutes</MenuItem>
              <MenuItem value={1.5}>3x per week at least 60 minutes</MenuItem>
              <MenuItem value={1.6}>Daily between 1 and 3 hours</MenuItem>
              <MenuItem value={1.8}>Daily for more than 3 hours</MenuItem>
            </Select>
          </FormControl>
        )}
      </div>
      <div>
        <FormControl>
          <p>
            Set your Goals for the week
            {/* <Button onClick={handleGoals}>Save</Button> */}
            {!(currentWeight && selectedGender && trainingFactor) ? (
              <Button disabled>Save</Button>
            ) : (
              <Button onClick={handleGoals}>Save</Button>
            )}
          </p>
        </FormControl>
      </div>
    </>
  );
};

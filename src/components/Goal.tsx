import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

// Phase 1 - a
// Get last Body weight and calories goal from DB and populate the fields Previous weight/calories
// User input new values into the fields New Body Weight and New Calories Goal
// Save new values to DB

// As initial values, before the page CalculateGoal is done, the application will show 0 for both fields
// When the user signup we will create the first value as 0
// When the CalculateGoal page is done this will replace the first value

export const Goal: FC = () => {
  let navigate = useNavigate();

  const handleGoals = () => {
    // Save goals to DB

    // redirect to home
    navigate("/home");
  };

  return (
    <>
      <p>Set your Goals</p>

      <Button
        onClick={() => {
          handleGoals;
        }}
      >
        save
      </Button>
      <Button onClick={() => navigate("/home")}>Sign Up</Button>
    </>
  );
};

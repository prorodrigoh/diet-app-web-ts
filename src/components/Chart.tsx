import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

// Phase 2
// get data from DB
// generates a line chart for weight X Time (weeks)

export const Chart: FC = () => {
  let navigate = useNavigate();

  return (
    <>
      <p>Progress Charts</p>
      <Button onClick={() => navigate("/home")}>Home</Button>
    </>
  );
};

import { Button } from "@mui/material";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVarContext } from "../App";
import { ListFoods } from "./ListFoods";
import { ListStats } from "./ListStats";

export const Dashboard: FC = () => {
  const { loggedUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();

  if (!loggedUser) {
    navigate("/login");
  }

  return (
    <>
      <ListStats />
      {/* <ListFoods /> */}
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

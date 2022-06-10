import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVarContext } from "../App";

export const ListStats: FC = () => {
  const { loggedUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();

  if (!loggedUser) {
    navigate("/login");
  }

  return (
    <>
      <div>
        <p>Welcome to your Dashboard</p>
        <p>Current Weight</p>
        {/* {currentWeight} */}
        <p>Daily Calories Goal</p>
        {/* {currentCalories} */}
        <p>Days until next weight in</p>
        {/* {daysToWeightIn} */}
        <p>Calories left for today</p>
        {/* {dailyCalories} */}
      </div>
    </>
  );
};

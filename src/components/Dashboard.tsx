import { Button, FormControl, FormLabel } from "@mui/material";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVarContext } from "../App";
import { ListFoods } from "./ListFoods";
import { ListStats } from "./ListStats";

export const Dashboard: FC = () => {
  const { loggedUser, setLoggedUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();

  if (!loggedUser) {
    navigate("/login");
  }

  return (
    <>
      <ListStats />
      {/* <ListFoods /> */}
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <FormLabel>
            Add a food that you have eaten to calculate your numbers for the day
          </FormLabel>
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <Button
            onClick={() => navigate("/daily")}
            variant="contained"
            component="span"
            size="large"
          >
            Add food
          </Button>
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <FormLabel>
            Set your goals for the week accordingly to your current weight
          </FormLabel>
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <Button
            onClick={() => navigate("/goal")}
            variant="contained"
            component="span"
            size="large"
          >
            Set Goal
          </Button>
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <FormLabel>
            <br />
          </FormLabel>
          <Button
            onClick={() => {
              setLoggedUser("");
              navigate("/login");
            }}
            variant="contained"
            component="span"
            size="large"
          >
            Logout
          </Button>
        </FormControl>
        {/* 
        <FormControl>
        <FormLabel>
          Check your charts to see your progress across time
          </FormLabel>
          <Button onClick={() => navigate("/chart")}>Charts</Button>
          </FormControl>
        </p> */}
      </div>
    </>
  );
};

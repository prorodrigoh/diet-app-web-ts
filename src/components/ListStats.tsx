import { FormControl, FormLabel, Grid, Paper } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVarContext } from "../App";
import { getUserById } from "../services/user";
import { DashboardChart } from "./DashboardChart";
import { DashboardDailyCalories } from "./DashboardDailyCalories";
import { DashboardDailyFoods } from "./DashboardDailyFoods";

export const ListStats: FC = () => {
  const { loggedUser, googleUserObj } = useContext(GlobalVarContext);
  let navigate = useNavigate();
  const [displayName, setDisplayName] = useState("display not set");

  if (!loggedUser) {
    navigate("/login");
  }

  const stats = async () => {
    if (googleUserObj) {
      setDisplayName(googleUserObj.googleName);
    } else {
      const { firstName, lastName } = await getUserById(loggedUser);
      setDisplayName(firstName + " " + lastName);
    }
  };

  useEffect(() => {
    stats();
  }, []);

  return (
    <>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
        <FormLabel>Welcome {displayName} to your Dashboard</FormLabel>
      </FormControl>
      {/* Week daily calories variance */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 360,
          }}
        >
          <DashboardChart />
        </Paper>
      </Grid>
      {/* Amount of calories left for the day */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 360,
          }}
        >
          <DashboardDailyCalories />
        </Paper>
      </Grid>
      {/* Foods eaten at that day */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <DashboardDailyFoods />
        </Paper>
      </Grid>
    </>
  );
};

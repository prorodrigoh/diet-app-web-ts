import { FC } from "react";
import { useNavigate } from "react-router-dom";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./DashboardTitle";
import { GlobalVarContext } from "../App";
import { getLastDailyGoalOfTheDayByUser } from "../services/dailygoal";

// Phase 2
// get data from DB
// generates a line chart for weight X Time (weeks)

export const DashboardChart: FC = () => {
  const { loggedUser, chartDailyCalories, chartDaysToWeightIn } =
    React.useContext(GlobalVarContext);
  let navigate = useNavigate();

  if (!loggedUser) {
    navigate("/login");
  }

  function createData(time: string, amount?: number) {
    return { time, amount };
  }

  // let dbData: Array<{}> = [];
  const data = [
    createData("7", 18),
    createData("6", 170),
    createData("5", 50),
    createData("4", 65),
    createData("3", -170),
    createData("2", 20),
    createData("1", 10),
  ];

  // const getData = async () => {
  //   for (let i = 7; i > 0; i--) {
  //     const calories = await getLastDailyGoalOfTheDayByUser(loggedUser, i);
  //     dbData.push({ i, calories });
  //   }
  // };

  // React.useEffect(() => {
  //   getData();
  // }, []);

  // have to create a new API endpoint
  // it returns dailyCalories and DaysToWeightIn from the last entry in the dailygoal collection
  // where daysToWeightIn in [1-7]

  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Calories Under/Over the goal on the day - Future Feature</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 24,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            {" "}
            <Label
              angle={0}
              position="bottom"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Days until next weight in
            </Label>
          </XAxis>
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Calories
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

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
  // const limit = 2000;
  // let data7 = limit,
  //   data6 = limit,
  //   data5 = limit,
  //   data4 = limit,
  //   data3 = limit,
  //   data2 = limit,
  //   data1 = limit;

  // switch (chartDaysToWeightIn) {
  //   case 7:
  //     data7 = chartDailyCalories;
  //     break;
  //   case 6:
  //     data6 = chartDailyCalories;
  //     break;
  //   case 5:
  //     data5 = chartDailyCalories;
  //     break;
  //   case 4:
  //     data4 = chartDailyCalories;
  //     break;
  //   case 3:
  //     data3 = chartDailyCalories;
  //     break;
  //   case 2:
  //     data2 = chartDailyCalories;
  //     break;
  //   case 1:
  //     data1 = chartDailyCalories;
  //     break;
  // }

  // const data = [
  //   createData("7", data7),
  //   createData("6", data6),
  //   createData("5", data5),
  //   createData("4", data4),
  //   createData("3", data3),
  //   createData("2", data2),
  //   createData("1", data1),
  // ];

  const data = [
    createData("7", 1850),
    createData("6", 1750),
    createData("5", 1800),
    createData("4", 1650),
    createData("3", 1700),
    createData("2", 1650),
    createData("1", 1700),
  ];

  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Week Calories Intake Variation - Future Feature</Title>
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

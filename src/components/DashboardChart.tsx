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
  const { loggedUser } = React.useContext(GlobalVarContext);
  let navigate = useNavigate();

  if (!loggedUser) {
    navigate("/login");
  }

  function createData(time: string, amount?: number) {
    return { time, amount };
  }

  const data = [
    createData("0", 1693),
    createData("1", 1800),
    createData("2", 1750),
    createData("3", 1600),
    createData("4", 1345),
    createData("5", 1924),
    createData("6", 1549),
    createData("7", 1802),
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
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
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
              Sales ($)
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

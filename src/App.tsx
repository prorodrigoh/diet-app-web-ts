import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, FC, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";
import { NewFood } from "./components/Food";
import { Daily } from "./components/Daily";
import { Goal } from "./components/Goal";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
// import { Template } from "./components/Template";

const theme = createTheme({
  typography: {
    fontFamily: `'Noto Sans', sans-serif`,
    fontWeightRegular: 600,
  },
  palette: {
    mode: "light",
    background: {
      // default: "#03053D",
      default: "#a5d6e3",
      paper: "#1b3d54",
    },
    primary: {
      main: "#4d88ff",
    },
    secondary: {
      main: "#a9a9a9",
    },
  },
});

export type GlobalContent = {
  googleUserObj: any;
  setGoogleUserObj: (c: any) => void;
  loggedUser: any;
  setLoggedUser: (c: any) => void;
  newUser: any;
  setNewUser: (c: any) => void;
  chartDailyCalories: any;
  setChartDailyCalories: (c: any) => void;
  chartDaysToWeightIn: any;
  setChartDaysToWeightIn: (c: any) => void;
};

export const GlobalVarContext = createContext<GlobalContent>({
  googleUserObj: undefined, // set a default value
  setGoogleUserObj: () => {},
  loggedUser: undefined, // set a default value
  setLoggedUser: () => {},
  newUser: false, // set a default to FALSE
  setNewUser: () => {},
  chartDailyCalories: 0,
  setChartDailyCalories: () => {},
  chartDaysToWeightIn: 7,
  setChartDaysToWeightIn: () => {},
}); // higher order component to store global values to be used throughout the application

export const App: FC = () => {
  const [loggedUser, setLoggedUser] = useState(); // user evaluates to falsy at first
  const [newUser, setNewUser] = useState();
  const [chartDailyCalories, setChartDailyCalories] = useState();
  const [chartDaysToWeightIn, setChartDaysToWeightIn] = useState();
  const [googleUserObj, setGoogleUserObj] = useState();

  return (
    <GlobalVarContext.Provider
      value={{
        googleUserObj,
        setGoogleUserObj,
        loggedUser,
        setLoggedUser,
        newUser,
        setNewUser,
        chartDailyCalories,
        setChartDailyCalories,
        chartDaysToWeightIn,
        setChartDaysToWeightIn,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/login"
            element={!loggedUser ? <Login /> : <Dashboard />}
          />
          <Route
            path="/signup"
            element={!loggedUser ? <Signup /> : <Dashboard />}
          />
          <Route
            path="/dashboard"
            element={!loggedUser ? <Login /> : <Dashboard />}
          />
          <Route path="/goal" element={!loggedUser ? <Login /> : <Goal />} />
          <Route path="/food" element={!loggedUser ? <Login /> : <NewFood />} />
          <Route path="/daily" element={!loggedUser ? <Login /> : <Daily />} />
          {/* <Route path="/template" element={<Template />} /> */}
        </Routes>
      </ThemeProvider>
    </GlobalVarContext.Provider>
  );
};

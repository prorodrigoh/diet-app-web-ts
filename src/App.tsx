import "./App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useContext, FC, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";
import { NewFood } from "./components/Food";
import { Landing } from "./components/Landing";
import { Home } from "./components/Home";
import { Chart } from "./components/Chart";
import { Goal } from "./components/Goal";
import { Login } from "./components/Login";

const theme = createTheme({
  typography: {
    fontFamily: `'Noto Sans', sans-serif`,
    fontWeightRegular: 600,
  },
  palette: {
    mode: "dark",
    background: {
      default: "#03053D",
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
  loggedUser: any;
  setLoggedUser: (c: any) => void;
};

export const GlobalVarContext = createContext<GlobalContent>({
  loggedUser: undefined, // set a default value
  setLoggedUser: () => {},
}); // higher order component to store global values to be used throughout the application

export const globalVarContext = () => useContext(GlobalVarContext);

export const App: FC = () => {
  const [loggedUser, setLoggedUser] = useState(); // user evaluates to falsy at first
  // const [users, setUsers] = useState<User[]>([]);
  // const [foods, setFoods] = useState<Food[]>([]);
  // const [cpws, setCpws] = useState<CPW[]>([]);

  // useEffect(() => {
  //   getAllUsers().then(setUsers);
  // }, [users]);
  // useEffect(() => {
  //   getAllFoods().then(setFoods);
  // }, [foods]);
  // useEffect(() => {
  //   getAllCPW().then(setCpws);
  // }, [cpws]);

  return (
    <GlobalVarContext.Provider value={{ loggedUser, setLoggedUser }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={!loggedUser ? <Login /> : <Home />} />
          <Route path="/signup" element={!loggedUser ? <Signup /> : <Home />} />
          <Route path="/goal" element={!loggedUser ? <Login /> : <Goal />} />
          <Route path="/food" element={!loggedUser ? <Login /> : <NewFood />} />
          <Route path="/chart" element={!loggedUser ? <Login /> : <Chart />} />
          <Route path="/home" element={!loggedUser ? <Login /> : <Home />} />
        </Routes>
      </ThemeProvider>
    </GlobalVarContext.Provider>
  );
};

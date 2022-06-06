import "./App.css";
import {
  createTheme,
  CssBaseline,
  List,
  ListItem,
  ThemeProvider,
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
  // Typography,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC, useEffect, useState } from "react";
import { User, getAllUsers } from "./services/user";
import { Signup } from "./components/Signup";
// import { Food, getAllFoods } from "./services/food";
// import { CPW, getAllCPW } from "./services/cpw";

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

export const App: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  // const [foods, setFoods] = useState<Food[]>([]);
  // const [cpws, setCpws] = useState<CPW[]>([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, [users]);
  // useEffect(() => {
  //   getAllFoods().then(setFoods);
  // }, [foods]);
  // useEffect(() => {
  //   getAllCPW().then(setCpws);
  // }, [cpws]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Signup />
      <div>
        <p>Users</p>
        <List>
          {users.map((user) => {
            return <ListItem key={user.createdAt}>{user.firstName}</ListItem>;
          })}
        </List>
      </div>
      {/* <div>
        <p>Food</p>
        <List>
          {foods.map((food) => {
            return <ListItem key={food.createdAt}>{food.name}</ListItem>;
          })}
        </List>
      </div>
      <div>
        <p>CPW</p>
        <List>
          {cpws.map((cpw) => {
            return <ListItem key={cpw.createdAt}>{cpw.calories}</ListItem>;
          })}
        </List>
      </div> */}
    </ThemeProvider>
  );
};

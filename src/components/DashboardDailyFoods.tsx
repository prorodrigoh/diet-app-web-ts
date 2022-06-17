import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./DashboardTitle";
import { GlobalVarContext } from "../App";
import { useNavigate } from "react-router-dom";
import { getAllFoodsOfTheDayByUser } from "../services/food";

export const DashboardDailyFoods: React.FC = () => {
  const { loggedUser } = React.useContext(GlobalVarContext);
  let navigate = useNavigate();
  const [foods, setFoods] = React.useState<[]>([]);

  if (!loggedUser) {
    navigate("/login");
  }

  const getData = async () => {
    const data: any = await getAllFoodsOfTheDayByUser(loggedUser);
    setFoods(data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <Title>Foods of the day</Title>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Food Name</TableCell>
            <TableCell align="center">Iso Calories</TableCell>
            <TableCell align="center">Iso Weight</TableCell>
            {/* <TableCell align="center">Weight Consumed</TableCell>
            <TableCell align="center">Calories Consumed</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.map((row: any) => (
            <TableRow key={row._id}>
              <TableCell align="center">{row.foodName}</TableCell>
              <TableCell align="center">{row.isoCalories}</TableCell>
              <TableCell align="center">{row.isoWeight}</TableCell>
              {/* <TableCell align="center">{row.foodWeight}</TableCell>
              <TableCell align="center">{row.foodCalories}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

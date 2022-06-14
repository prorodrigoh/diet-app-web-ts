import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVarContext } from "../App";
import { Food, getAllFoodsOfTheDayByUser } from "../services/food";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const ListFoods: FC = () => {
  const { loggedUser } = useContext(GlobalVarContext);
  let navigate = useNavigate();

  if (!loggedUser) {
    navigate("/login");
  }
  const [foods, setFoods] = useState<Food[]>([]);

  // Get all foods of the day by user
  useEffect(() => {
    getAllFoodsOfTheDayByUser(loggedUser).then(setFoods);
  }, [foods]);
  // Get all CPW by food for that day

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Food</TableCell>
              <TableCell align="right">ISO Calories</TableCell>
              <TableCell align="right">ISO Weight&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foods.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.foodName}
                </TableCell>
                <TableCell align="right">{row.isoCalories}</TableCell>
                <TableCell align="right">{row.isoWeight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

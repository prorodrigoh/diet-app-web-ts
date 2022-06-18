import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import BarChartIcon from "@mui/icons-material/BarChart";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";
import { Divider, List } from "@mui/material";
import { GlobalVarContext } from "../App";
import { FC } from "react";

export const DashboardSideNavBar: FC = () => {
  const { loggedUser, setLoggedUser, newUser, setGoogleUserObj } =
    React.useContext(GlobalVarContext);
  let navigate = useNavigate();

  if (!loggedUser) {
    navigate("/login");
  }

  return (
    <>
      <List component="nav">
        {!newUser ? (
          <>
            <ListItemButton onClick={() => navigate("/daily")}>
              <ListItemIcon>
                <DinnerDiningIcon />
              </ListItemIcon>
              <ListItemText primary="Add existing Food" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/food")}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Create a new Food" />
            </ListItemButton>
          </>
        ) : (
          <></>
        )}
        {/* --------------------------------------- */}
        <ListItemButton onClick={() => navigate("/goal")}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Set Goal" />
        </ListItemButton>
        {/* --------------------------------------- */}
        <ListItemButton
          onClick={() => {
            setLoggedUser("");
            setGoogleUserObj("");
            navigate("/login");
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItemButton>
        {/* --------------------------------------- */}
        <Divider sx={{ my: 1 }} />
        <ListSubheader component="div" inset>
          Future Feature - Reports
        </ListSubheader>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Yearly" />
        </ListItemButton>
      </List>
    </>
  );
};

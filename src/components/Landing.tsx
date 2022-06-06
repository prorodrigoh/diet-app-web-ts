import { Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

// Phase 2
// Will show a carousel with screenshots of the Home page, Chart page
// Will show a text about the application
// Will show the Login Signup buttons

export const Landing: FC = () => {
  let navigate = useNavigate();

  return (
    <>
      <p>Welcome to the Diet App</p>
      <Button onClick={() => navigate("/login")}>Log in</Button>
      <Button onClick={() => navigate("/signup")}>Sign Up</Button>
    </>
  );
};

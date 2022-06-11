import { Button, FormControl, FormHelperText, FormLabel } from "@mui/material";
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
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <FormLabel>Welcome to your life changing diet assistant</FormLabel>
          <br />
          <FormLabel>
            It will help you calculate and track your calories
          </FormLabel>
          <br />
          <FormLabel>
            No more searching, writing and calculating by hand every time
          </FormLabel>
        </FormControl>
      </div>

      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            component="span"
            size="large"
            aria-describedby="my-helper-text"
          >
            Continue your journey
          </Button>
          <FormHelperText id="my-helper-text" hidden>
            Lets make easier to know what we eat
          </FormHelperText>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <Button
            onClick={() => navigate("/signup")}
            variant="contained"
            component="span"
            size="large"
            aria-describedby="my-helper-text"
          >
            Start your journey
          </Button>
          <FormHelperText id="my-helper-text" hidden>
            Change your life forever
          </FormHelperText>
        </FormControl>
      </div>
    </>
  );
};

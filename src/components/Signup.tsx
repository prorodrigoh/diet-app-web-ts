// Phase 2

// User input Email, Password, First Name, Last Name, DoB (mm/yyyy)
// On click button Sign up the application will save the user and redirect to the home page
// At first the application will setup the first Weight and first Goal as 0 in the DB
// When the CalculateGoal page is completed the signup will redirect the user to it

import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FC, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVarContext } from "../App";
import { createUser, getUserByEmail } from "../services/user";

export const Signup: FC = () => {
  const { setLoggedUser } = useContext(GlobalVarContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [ageGroup, setAgeGroup] = useState(0);
  let navigate = useNavigate();

  const signup = async (e: FormEvent) => {
    e.preventDefault();
    const createdAt = new Date();
    createUser({
      createdAt,
      firstName,
      lastName,
      email,
      ageGroup,
    });
    const id = await getUserByEmail(email);
    setLoggedUser(id);
    navigate("/dashboard");
  };

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 416 }}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-filled-label">
            Select your Age Group
          </InputLabel>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value as any)}
          >
            <MenuItem value={0}>Select</MenuItem>
            <MenuItem value={1}>10 to 18</MenuItem>
            <MenuItem value={2}>19 to 30</MenuItem>
            <MenuItem value={3}>31 to 60</MenuItem>
            <MenuItem value={4}>60+</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <div>
            {!ageGroup || !firstName || !email ? (
              <Button disabled>Create User</Button>
            ) : (
              <Button onClick={signup}>Create User</Button>
            )}
          </div>
        </FormControl>
      </div>
    </>
  );
};

// Phase 2

// User input Email, Password, First Name, Last Name, DoB (mm/yyyy)
// On click button Sign up the application will save the user and redirect to the home page
// At first the application will setup the first Weight and first Goal as 0 in the DB
// When the CalculateGoal page is completed the signup will redirect the user to it

import { Button, Input, MenuItem, Select } from "@mui/material";
import { FC, FormEvent, useState } from "react";
import { createUser } from "../services/user";

export const Signup: FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  let ageGroup: number;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const createdAt = Date.now();
    createUser({
      createdAt,
      firstName,
      lastName,
      email,
      ageGroup,
    });
    clearForm();
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
      </div>
      <Select onChange={(e) => (ageGroup = e.target.value as any)}>
        <MenuItem value="">Age Group</MenuItem>
        <MenuItem value={1}>10 to 18</MenuItem>
        <MenuItem value={2}>19 to 30</MenuItem>
        <MenuItem value={3}>31 to 60</MenuItem>
        <MenuItem value={4}>60+</MenuItem>
      </Select>
      <Button type="submit">Create User</Button>
    </form>
  );
};

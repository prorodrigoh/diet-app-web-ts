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
  const [dobM, setDobM] = useState<
    1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  >(1);
  const [dobY, setDobY] = useState(2000);
  const [email, setEmail] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const createdAt = Date.now();
    await createUser({
      createdAt,
      firstName,
      lastName,
      dobM,
      dobY,
      email,
    });
    await clearForm();
  };

  const clearForm = async () => {
    setFirstName("");
    setLastName("");
    setDobM(1);
    setDobY(2000);
    setEmail("");
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
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
      <Select value={dobM} onChange={(e) => setDobM(e.target.value as any)}>
        <MenuItem value="">Month</MenuItem>
        <MenuItem value={1}>{1}</MenuItem>
        <MenuItem value={2}>{2}</MenuItem>
        <MenuItem value={3}>{3}</MenuItem>
        <MenuItem value={4}>{4}</MenuItem>
        <MenuItem value={5}>{5}</MenuItem>
        <MenuItem value={6}>{6}</MenuItem>
        <MenuItem value={7}>{7}</MenuItem>
        <MenuItem value={8}>{8}</MenuItem>
        <MenuItem value={9}>{9}</MenuItem>
        <MenuItem value={10}>{10}</MenuItem>
        <MenuItem value={11}>{11}</MenuItem>
        <MenuItem value={12}>{12}</MenuItem>
      </Select>
      <Input
        value={dobY}
        onChange={(e) => setDobY(e.target.value as any)}
        placeholder="Year"
      />
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <Button type="submit">Create User</Button>
    </form>
  );
};

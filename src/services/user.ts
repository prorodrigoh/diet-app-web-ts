import { getClient } from "./client";

export interface User {
  createdAt: number;
  firstName: string;
  lastName: string;
  dobM: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  dobY: number;
  email: string;
}

// http requests

export const getAllUsers = async () => {
  const client = getClient();
  const { data } = await client.get("/allusers");
  return data as User[];
};

export const createUser = async (user: User) => {
  const client = getClient();
  await client.post("/createuser", user);
};

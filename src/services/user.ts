import { getClient } from "./client";

export interface User {
  createAt: number;
  firstName: string;
  lastName: string;
  DOBm: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  DOBy: number;
  email: string;
}

// http requests

export const getAllUsers = async () => {
  const client = getClient();
  const { data } = await client.get("/allusers");
  return data as User[];
};

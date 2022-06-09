import { getClient } from "./client";

export interface User {
  createdAt: number;
  firstName: string;
  lastName: string;
  email: string;
  ageGroup: number;
}

// http requests

export const createUser = (user: User) => {
  const client = getClient();
  client.post("/createuser", user);
};

export const getUserById = async (userId: string) => {
  const client = getClient();
  const { data } = await client.get(`/userbyid/${userId}`);
  return data as User;
};

export const getUserByEmail = async (email: string) => {
  const client = getClient();
  const { data } = await client.get(email);
  return data as User;
};

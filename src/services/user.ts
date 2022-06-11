import { getClient } from "./client";

export interface User {
  _id?: String;
  createdAt?: Date;
  firstName: string;
  lastName: string;
  email: string;
  ageGroup: number;
}

// http requests

export const createUser = (user: User) => {
  const client = getClient();
  const id = client.post("/signup", user);
  return id;
};

export const getUserById = async (userId: string) => {
  const client = getClient();
  const { data } = await client.get(`/userbyid/${userId}`);
  return data as User;
};

export const getUserByEmail = async (email: string) => {
  const client = getClient();
  const { data } = await client.get(`/login/${email}`);
  return data as User;
};

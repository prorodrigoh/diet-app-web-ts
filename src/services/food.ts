import { getClient } from "./client";

export interface Food {
  createdAt: number;
  userId: string;
  name: string;
  ISOWeight: number;
  ISOUnit: "g";
  ISOCalories: number;
}

// http requests

export const getAllFoods = async () => {
  const client = getClient();
  const { data } = await client.get("/allfoods");
  return data as Food[];
};

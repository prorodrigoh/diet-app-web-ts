import { getClient } from "./client";

export interface Food {
  createdAt: number;
  userId: string;
  foodName: string;
  isoWeight: number;
  isoUnit: string;
  isoCalories: number;
}

// http requests

export const getAllFoods = async () => {
  const client = getClient();
  const { data } = await client.get("/allfoods");
  return data as Food[];
};

export const createFood = async (food: Food) => {
  const client = getClient();
  await client.post("/createfood", food);
};

import { getClient } from "./client";

export interface Food {
  _id?: string;
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

export const getFoodById = async (foodId: string) => {
  const client = getClient();
  const { data } = await client.get(`/foodbyid/${foodId}`);
  return data as Food;
};

export const createFood = async (food: Food) => {
  const client = getClient();
  await client.post("/createfood", food);
};

export const getAllFoodsByUser = async (loggedUser: string) => {
  if (!loggedUser) {
    return "User not logged";
  }
  const client = getClient();
  const { data } = await client.get("/allfoodsbyuser", loggedUser as any);
  return data as Food[];
};

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
export const createFood = (food: Food) => {
  const client = getClient();
  client.post("/createfood", food);
};

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

export const getAllFoodsByUser = async (loggedUser: string) => {
  const client = getClient();
  const { data } = await client.get("/allfoodsbyuser", loggedUser as any);
  return data as Food[];
};

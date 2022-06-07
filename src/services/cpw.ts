import { getClient } from "./client";

export interface CPW {
  createdAt: number;
  foodWeight: number;
  foodCalories: number;
  foodId: string;
}

// http requests

export const getAllCPW = async () => {
  const client = getClient();
  const { data } = await client.get("/allcpw");
  return data as CPW[];
};

export const createCPW = async (cpw: CPW) => {
  console.log(cpw);
  const client = getClient();
  await client.post("/createcpw", cpw);
};

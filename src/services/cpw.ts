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

export const createCPW = (cpw: CPW) => {
  const client = getClient();
  client.post("/createcpw", cpw);
};

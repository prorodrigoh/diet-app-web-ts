import { getClient } from "./client";

export interface CPW {
  createdAt: number;
  weight: number;
  calories: number;
  foodId: string;
}

// http requests

export const getAllCPW = async () => {
  const client = getClient();
  const { data } = await client.get("/allcpw");
  return data as CPW[];
};

import { Goal } from "../components/Goal";
import { getClient } from "./client";

export interface Goal {
  _id?: string;
  createdAt: number;
  userId: string;
  trainingFactor: number;
  previousWeight: number;
  previousCalories: number;
  currentWeight: number;
  currentCalories: number;
}

export const createGoal = (goal: Goal) => {
  const client = getClient();
  client.post("/creategoal", goal);
};

export const getCurrentGoalByUser = async (userId: string) => {
  const client = getClient();
  const { data } = await client.get(`/currentweekgoalbyuser/${userId}`);
  return data;
};

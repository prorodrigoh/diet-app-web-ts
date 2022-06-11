import { getClient } from "./client";

export interface Goal {
  _id?: string;
  createdAt?: Date;
  userId: string;
  trainingFactor: number;
  previousWeight: number;
  previousCalories: number;
  currentWeight: number;
  currentCalories: number;
}

export const createGoal = (goal: Goal) => {
  const client = getClient();
  const id = client.post("/creategoal", goal);
  return id;
};

export const getCurrentWeekGoalByUser = async (userId: string) => {
  const client = getClient();
  const { data } = await client.get(`/currentweekgoalbyuser/${userId}`);
  return data;
};

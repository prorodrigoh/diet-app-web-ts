import { getClient } from "./client";

export interface Goal {
  _id?: string;
  createdAt: number;
  userId: string;
  height: number;
  daysOfTraining: 1 | 2 | 3 | 4 | 5;
  iniWeight: number;
  iniCalories: number;
  actualWeight: number;
  actualCalories: number;
  dailyCalories: number;
  daysToWeighIn: number;
}

export const createGoal = async (goal: Goal) => {
  const client = getClient();
  await client.post("/creategoal", goal);
};

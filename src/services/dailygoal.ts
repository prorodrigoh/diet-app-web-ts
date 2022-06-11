import { getClient } from "./client";

// every day we create one.
// every Goal will have 7 of these
export interface DailyGoal {
  _id?: string;
  createdAt?: Date;
  goalId: string;
  dailyCalories: number; // update every time user add food from the Food page
  daysToWeightIn: number; // set initially at 7. The last one to be created will set it to 1
}

export const createDailyGoal = (dailyGoal: DailyGoal) => {
  const client = getClient();
  client.post("/createdailygoal", dailyGoal);
};

export const getCurrentDailyGoalByUser = async (userId: string) => {
  const client = getClient();
  const { data } = await client.get(`/dailygoalbyuser/${userId}`);
  return data;
};

import axios from "axios";

export const getClient = () => {
  return axios.create({
    // this is the address where the api is running
    baseURL: "http://localhost:3000",
  });
};

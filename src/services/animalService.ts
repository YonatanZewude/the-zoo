import axios from "axios";
import { IAnimalSmall } from "../models/IAnimalsSmall";

const BASE_URL = "https://animals.azurewebsites.net/api/animals";

export const getAnimals = async (): Promise<IAnimalSmall[]> => {
  try {
    const response = await axios.get<IAnimalSmall[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching animals:", error);
    return [];
  }
};

import { string, number, object } from "yup";

export const createGrocerySchema = object().shape({
  name: string().required().trim().max(128).label("Name"),
  ingredients: string().required().trim().max(1028).label("Ingredients"),
  weight: number().required().positive().label("Weight"),
});

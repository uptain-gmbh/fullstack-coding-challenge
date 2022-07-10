import { string, number, object } from "yup";
import { ingredientsSchema } from "./ingredients.validation";

export const createGrocerySchema = object().shape({
  name: string().required().trim().max(128).label("Name"),
  ingredients: ingredientsSchema.label("Ingredients"),
  weight: number().required().positive().label("Weight"),
});

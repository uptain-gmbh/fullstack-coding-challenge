import { object, number, string } from 'yup';
import { ingredientsSchema } from './ingredients.schema';

export const grocerySchema = object().shape({
  name: string().required().trim().max(128).label("Name"),
  ingredients: ingredientsSchema.label("Ingredients"),
  weight: number().required().positive().label("Weight"),
});

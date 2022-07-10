import { IngredientModel } from "./ingredient.model";

export interface GroceryModel {
  id: string;
  name: string;
  ingredients: IngredientModel[];
  weight: number;
}

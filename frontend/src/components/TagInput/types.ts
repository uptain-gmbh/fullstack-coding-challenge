import { IngredientModel } from "../../models";

export interface TagInputProps {
  label: string;
  value: IngredientModel[];
  onChange: (value: IngredientModel[]) => void;
  error?: boolean;
}

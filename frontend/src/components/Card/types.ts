import { GroceryModel } from "../../models";

export interface CardProps {
  data?: GroceryModel;
  onItemAdd: (value: Omit<GroceryModel, "id">) => void;
  onItemDelete: (id: string) => void;
  onItemEdit: (value: GroceryModel) => void;
}

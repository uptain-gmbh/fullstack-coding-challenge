import { string } from "yup";
import { createGrocerySchema } from "./createGrocery.validation";

export const updateGrocerySchema = createGrocerySchema.shape({
  id: string().required().uuid().label("Id"),
});

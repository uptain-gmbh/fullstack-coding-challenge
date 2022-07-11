import { string, object, array } from "yup";

export const ingredientsSchema = array().of(
  object().shape({
    id: string().required(),
    text: string().required(),
  })
).min(1);

import * as yup from "yup";

export const contentSchema = yup.string().required().trim().max(1024).strict();

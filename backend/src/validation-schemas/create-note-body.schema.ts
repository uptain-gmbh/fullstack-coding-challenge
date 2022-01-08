import * as yup from 'yup';

/*
  Describes the validation rules for the note creation body object
 */
export const createNoteBodySchema = yup
  .object()
  .shape({
    content: yup.string().required().trim().max(1024).strict(),
  })
  .strict();

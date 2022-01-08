import { handlerWrapper } from '../utils';
import { noteService } from '../services';
import { NoteModel } from '../models';

/*
    Handler for GET /notes endpoint that returns the full list of notes
 */
export const handler = handlerWrapper<NoteModel[]>(async () => {
  const notes = await noteService.getNotesList();

  return {
    statusCode: 200,
    data: notes,
  };
});

import { noteService } from '../services';
import { handlerWrapper } from '../utils';
import { NoteModel } from '../models';
import { CreateNote } from '../interfaces';

/*
    Handler for POST /notes endpoint responsible for note entity creation
 */
export const handler = handlerWrapper<NoteModel>(async (event) => {
  const { body } = event;

  const input: CreateNote = body && JSON.parse(body);

  const note = await noteService.createNote(input);

  return {
    statusCode: 201,
    data: note,
  };
});

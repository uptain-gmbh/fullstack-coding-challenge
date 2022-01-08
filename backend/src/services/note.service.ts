import { noteRepository } from '../repositories';
import { createNoteBodySchema } from '../validation-schemas';
import { CreateNote } from '../interfaces';
import { NoteModel } from '../models';
import { BadRequestException } from '../exceptions/bad-request.exception';

class NoteService {
  public async createNote(input: CreateNote): Promise<NoteModel> {
    console.log(`Create note executed`, { input });

    /*
      Check if the client did not send us an empty body
     */
    if (!input) {
      throw new BadRequestException('No input data provided.');
    }

    const { content } = input;

    /*
     Validates the values of the provided input object
     */
    await createNoteBodySchema.validate({
      content,
    });

    return await noteRepository.create(content);
  }

  public async getNotesList(): Promise<NoteModel[]> {
    console.log(`Get note list executed`);

    return await noteRepository.getMany();
  }
}

export const noteService = new NoteService();

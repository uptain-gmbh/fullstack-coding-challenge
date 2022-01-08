import { BaseRepository } from './base.repository';
import { config } from '../utils';
import { NoteModel } from '../models';
import { v4 } from 'uuid';

/*
  Contains all interaction with DynamoDB notes table
 */
class NoteRepository extends BaseRepository {
  public constructor() {
    super(config.DynamoDB.NOTES_TABLE_NAME);
  }

  public async create(content: string): Promise<NoteModel> {
    /*
      Generating the unique identifier for note model
     */
    const noteId = v4();

    const createdAt = Date.now();

    const model: NoteModel = {
      noteId,
      content,
      createdAt,
    };

    console.log('Note repository create', {
      model,
    });

    await this.put(model);

    return model;
  }

  public async getMany(): Promise<NoteModel[]> {
    const result = await this.getList();

    /*
     Extracting the items from the standard DynamoDB scan response object with required type
     */
    return result.Items as NoteModel[];
  }
}

export const noteRepository = new NoteRepository();

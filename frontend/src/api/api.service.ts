import { Note, CreateNote, ApiResponse } from './interfaces';
import { Axios } from 'axios';
import { config } from '../utils/config';

class ApiService {
  private readonly axiosClient: Axios;

  constructor() {
    this.axiosClient = new Axios({
      baseURL: config.API_ENDPOINT,
    });
  }

  public async createNote(input: CreateNote): Promise<ApiResponse> {
    try {
      const response = await this.axiosClient.post('/notes', JSON.stringify(input));

      return JSON.parse(response.data);
    } catch (err) {
      return {
        success: false,
      };
    }
  }

  public async getNotesList(): Promise<ApiResponse<Note[]>> {
    try {
      const response = await this.axiosClient.get('/notes');

      return JSON.parse(response.data);
    } catch (err) {
      return {
        success: false,
      };
    }
  }
}

export const apiService = new ApiService();

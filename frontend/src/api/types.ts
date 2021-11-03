import { Author, FormatsData, MediaType } from "../shared";

export interface BookParams {
  title: string;
  subjects: string[];
  authors: Author[];
  languages: string[];
  bookshelves: string[];
  formats: FormatsData;
  mediaType: MediaType;
}

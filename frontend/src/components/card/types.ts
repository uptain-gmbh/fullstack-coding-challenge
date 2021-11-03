import { Author, FormatsData, MediaType } from "../../shared";

export interface CardProps {
  bookId: string;
  title: string;
  subjects: string[];
  authors: Author[];
  languages: string[];
  bookshelves: string[];
  formats: FormatsData;
  mediaType: MediaType;
  setListState: (bookId: string) => void;
}



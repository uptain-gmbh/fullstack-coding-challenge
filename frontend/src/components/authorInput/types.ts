import { Author } from "../../shared";

export interface AuthorInputProps {
  value: Author[];
  onAdd: (value: Author) => void;
  onDelete: (value: Author, index: number) => void;
}

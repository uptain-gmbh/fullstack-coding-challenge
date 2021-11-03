import { CardProps } from "../card/types";

export interface GridProps {
  values: CardProps[];
  setListState: (bookId: string) => void;
}

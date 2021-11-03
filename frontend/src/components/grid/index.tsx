import { GridProps } from "./types";
import { FC } from "react";
import { Card } from "..";

export const Grid: FC<GridProps> = ({ values, setListState }) => {
  return (
    <div
      style={{
        flex: 8,
        display: "flex",
        padding: "25px",
        flexDirection: "row",
        flexWrap: "wrap",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {values.map((props) => (
        <Card key={props.bookId} {...props} setListState={setListState} />
      ))}
    </div>
  );
};

import React, { FC, useCallback } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { IngredientModel } from "../../models";
import { LabelStyles, WrapperStyles } from "./styled";
import { TagInputProps } from "./types";

export const TagInput: FC<TagInputProps> = ({ label, value, onChange }) => {
  const onAddHandler = useCallback(
    (tag: IngredientModel) => {
      onChange([...value, tag]);
    },
    [onChange, value]
  );

  const onRemoveHandler = useCallback(
    (index: number) => {
      onChange(value.filter((_, itemIndex) => itemIndex !== index));
    },
    [onChange, value]
  );

  const onDragHandler = useCallback(
    (tag: IngredientModel, prevIndex: number, nextIndex: number) => {
      const copy = value.slice();

      copy.splice(prevIndex, 1);
      copy.splice(nextIndex, 0, tag);
      onChange(copy);
    },
    [onChange, value]
  );

  return (
    <WrapperStyles>
      <LabelStyles>{label}</LabelStyles>
      <ReactTags
        inline
        allowDragDrop
        tags={value}
        handleAddition={onAddHandler}
        handleDelete={onRemoveHandler}
        handleDrag={onDragHandler}
        inputFieldPosition="top"
      />
    </WrapperStyles>
  );
};

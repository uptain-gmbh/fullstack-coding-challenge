import React, { PropsWithChildren, useCallback } from "react";
import { Input } from "../Input";
import { FooterStyles, WrapperStyles, HeaderStyles } from "./styled";
import { CardProps } from "./types";
import { useFormik, FormikHelpers } from "formik";
import { GroceryModel, IngredientModel } from "../../models";
import { TagInput } from "../TagInput";
import { Button } from "../Button";
import { emptyGrocery } from "./helpers";
import { Text } from "../Text";
import { groceriesSelector, REQUEST_STATUS, useAppSelector } from "../../redux";

export const Card = ({
  data,
  onItemAdd,
  onItemEdit,
  onItemDelete,
}: PropsWithChildren<CardProps>) => {
  const { addLoading, editLoading, deleteLoading } =
    useAppSelector(groceriesSelector);

  const newGrocery = !data;

  const submitForm = useCallback(
    (
      { id, ...value }: GroceryModel,
      { resetForm }: FormikHelpers<GroceryModel>
    ) => {
      if (newGrocery) {
        resetForm();
        onItemAdd(value);
      } else {
        onItemEdit({ id, ...value });
      }
    },
    [newGrocery, onItemAdd, onItemEdit]
  );

  const { values, setFieldValue, handleSubmit, dirty, resetForm } = useFormik({
    initialValues: data ?? emptyGrocery,
    enableReinitialize: true,
    onSubmit: submitForm,
  });

  const handleInputChange = useCallback(
    (field: keyof GroceryModel) => (value: string | IngredientModel[]) => {
      setFieldValue(field, value);
    },
    [setFieldValue]
  );

  const handleDelete = useCallback(() => {
    onItemDelete(data?.id ?? "");
  }, [data?.id, onItemDelete]);

  const buttonLabel = newGrocery ? "Add" : "Save";

  const addUpdateInProgress =
    addLoading === REQUEST_STATUS.PENDING ||
    editLoading === REQUEST_STATUS.PENDING;

  const deleteInProgress = deleteLoading === REQUEST_STATUS.PENDING;

  return (
    <WrapperStyles>
      {newGrocery ? (
        <Text>Add new Item</Text>
      ) : (
        <HeaderStyles>
          <Button
            disabled={deleteInProgress}
            label="X"
            onClick={handleDelete}
          />
        </HeaderStyles>
      )}
      <Input
        value={values.name}
        label="Name"
        onChange={handleInputChange("name")}
      />
      <TagInput
        value={values.ingredients}
        label="Ingredients"
        onChange={handleInputChange("ingredients")}
      />
      <Input
        value={values.weight.toString()}
        label="Weight"
        onChange={handleInputChange("weight")}
        number
      />
      {(dirty || newGrocery) && (
        <FooterStyles>
          <Button
            disabled={addUpdateInProgress}
            label={buttonLabel}
            onClick={handleSubmit}
          />
          {!newGrocery && <Button label="Cancel" onClick={resetForm} />}
        </FooterStyles>
      )}
    </WrapperStyles>
  );
};

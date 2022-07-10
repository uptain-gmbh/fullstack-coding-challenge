import React, { FC, useCallback, useEffect } from "react";
import { PageWrapper, Card } from "../../components";
import { GroceryModel } from "../../models";
import {
  getGroceriesList,
  addGrocery,
  editGrocery,
  deleteGrocery,
  groceriesSelector,
  useAppDispatch,
  useAppSelector,
} from "../../redux";

export const GroceriesList: FC = () => {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector(groceriesSelector);

  useEffect(() => {
    dispatch(getGroceriesList());
  }, [dispatch]);

  const onAdd = useCallback(
    (value: Omit<GroceryModel, "id">) => {
      dispatch(addGrocery(value));
    },
    [dispatch]
  );

  const onEdit = useCallback(
    (value: GroceryModel) => {
      dispatch(editGrocery(value));
    },
    [dispatch]
  );

  const onDelete = useCallback(
    (id: string) => {
      dispatch(deleteGrocery(id));
    },
    [dispatch]
  );

  return (
    <PageWrapper>
      {data.map((value) => (
        <Card
          key={value.id}
          data={value}
          onItemAdd={onAdd}
          onItemEdit={onEdit}
          onItemDelete={onDelete}
        />
      ))}
      <Card onItemAdd={onAdd} onItemEdit={onEdit} onItemDelete={onDelete} />
    </PageWrapper>
  );
};

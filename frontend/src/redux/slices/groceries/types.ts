import { GroceryModel } from "../../../models";

export enum REQUEST_STATUS {
  IDLE,
  PENDING,
  FULFILLED,
  REJECTED,
}

export type RequestStatusData = {
  listLoading: REQUEST_STATUS;
  addLoading: REQUEST_STATUS;
  editLoading: REQUEST_STATUS;
  deleteLoading: REQUEST_STATUS;
};

export type RequestData<T> = {
  data: T;
  errors: Record<string, string>;
} & RequestStatusData;

export type InitialStateData = RequestData<GroceryModel[]>;

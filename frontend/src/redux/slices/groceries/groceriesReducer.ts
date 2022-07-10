import { RootState } from "../../store/store";
import {
  createAsyncThunk,
  createSlice,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import axios from "../../../api/axiosClient";
import { GroceryModel } from "../../../models";
import { InitialStateData, REQUEST_STATUS } from "./types";

const sliceName = "groceryList";

const initialState: InitialStateData = {
  data: [],
  listLoading: REQUEST_STATUS.IDLE,
  addLoading: REQUEST_STATUS.IDLE,
  editLoading: REQUEST_STATUS.IDLE,
  deleteLoading: REQUEST_STATUS.IDLE,
  errors: {},
};

export const getGroceriesList = createAsyncThunk(
  `${sliceName}/groceriesList`,
  async () => {
    const { data } = await axios.get<GroceryModel[]>("/groceries");
    return data;
  }
);

export const addGrocery = createAsyncThunk(
  `${sliceName}/groceriesAdd`,
  async (value: Omit<GroceryModel, "id">) => {
    const { data } = await axios.post<GroceryModel>("/groceries", value);
    return data;
  }
);

export const editGrocery = createAsyncThunk(
  `${sliceName}/groceriesEdit`,
  async (value: GroceryModel) => {
    const { data } = await axios.put<GroceryModel>("/groceries", value);
    return data;
  }
);

export const deleteGrocery = createAsyncThunk(
  `${sliceName}/groceriesDelete`,
  async (id: string) => {
    const { data } = await axios.delete<GroceryModel>(`/groceries/${id}`);
    return data;
  }
);

export const groceriesSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroceriesList.pending, (state) => {
      state.listLoading = REQUEST_STATUS.PENDING;
    });
    builder.addCase(getGroceriesList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.listLoading = REQUEST_STATUS.FULFILLED;
    });
    builder.addCase(getGroceriesList.rejected, (state) => {
      state.listLoading = REQUEST_STATUS.REJECTED;
    });
    builder.addCase(addGrocery.pending, (state) => {
      state.addLoading = REQUEST_STATUS.PENDING;
    });
    builder.addCase(addGrocery.fulfilled, (state, { payload }) => {
      state.data = [...state.data, payload];
      state.addLoading = REQUEST_STATUS.FULFILLED;
    });
    builder.addCase(addGrocery.rejected, (state) => {
      state.addLoading = REQUEST_STATUS.REJECTED;
    });
    builder.addCase(editGrocery.pending, (state) => {
      state.editLoading = REQUEST_STATUS.PENDING;
    });
    builder.addCase(editGrocery.fulfilled, (state, { payload }) => {
      state.data = state.data.map((value) =>
        value.id === payload.id ? payload : value
      );
      state.editLoading = REQUEST_STATUS.FULFILLED;
    });
    builder.addCase(editGrocery.rejected, (state) => {
      state.editLoading = REQUEST_STATUS.REJECTED;
    });
    builder.addCase(deleteGrocery.pending, (state) => {
      state.deleteLoading = REQUEST_STATUS.PENDING;
    });
    builder.addCase(deleteGrocery.fulfilled, (state, { payload }) => {
      state.data = state.data.filter((value) => value.id !== payload.id);
      state.deleteLoading = REQUEST_STATUS.FULFILLED;
    });
    builder.addCase(deleteGrocery.rejected, (state) => {
      state.deleteLoading = REQUEST_STATUS.REJECTED;
    });
  },
});

const groceriesList = (state: RootState): InitialStateData => state.groceries;

export const groceriesSelector = createDraftSafeSelector(
  groceriesList,
  (state) => state
);

export const groceriesReducer = groceriesSlice.reducer;

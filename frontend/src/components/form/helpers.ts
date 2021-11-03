import { Format, MediaType } from "../../shared";
import { FormFields, FormValues, HandleChangeFunction, HandleChipChangeFunction, HandleSelectChange, SetFieldValueType } from "./types";

export const initialFormValues: FormValues = {
  title: '',
  authors: [],
  bookshelves: [],
  formats: {
    [Format.PDF]: '',
    [Format.EBOOK]: '',
    [Format.TEXT_UTF8]: '',
    [Format.ZIP]: '',
  },
  languages: [],
  mediaType: MediaType.TEXT,
  subjects: [],
}

export const handleFormValueChange: HandleChangeFunction = (setFunc: SetFieldValueType) => (field: string) => ({ target: { value } }) => {
  setFunc(field, value);
}

export const handleSelectChange: HandleSelectChange = (setFunc: SetFieldValueType) => (field: string) => ({ target: { value } }) => {
  setFunc(field, value);
}

export const handleChipInputValueChange: HandleChipChangeFunction = (setFunc, currentValue) =>  {
  const addChip = (field: string) => (value: any) => {
    setFunc(field, [...currentValue[field as FormFields], value]);
  };

  const deleteChip = (field: string) => (_: any, index: number) => {
    setFunc(field, currentValue[field as FormFields].filter((_, arrayIndex) => arrayIndex !== index));
  }

  return { addChip, deleteChip };
}

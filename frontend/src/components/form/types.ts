import { FormikHelpers } from "formik";

export interface FormaProps {
  handleSubmit: (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => void;
}

export type FormValues = {
  [key in FormFields]: string | number | string[] | any;
}

export type SetFieldValueType = (field: string, value: any, shouldValidate?: boolean | undefined) => void;

export type HandleChangeFunction = (setFunc: SetFieldValueType) => (field: string) => React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export type HandleSelectChange = (setFunc: SetFieldValueType) => (field: string) => (event: React.ChangeEvent<{
  name?: string | undefined;
  value: unknown;
}>) => void;

export type HandleChipChangeFunction = (setFunc: SetFieldValueType, currentValue: { [key in FormFields]: any[] }) => 
  { 
    addChip: (field: string) => (value: any) => void, 
    deleteChip: (field: string) => (_: any, index: number) => void 
  };

export enum FormFields {
  TITLE = 'title',
  SUBJECTS = 'subjects',
  AUTHORS = "authors",
  LANGUAGES = "languages",
  BOOKSHELVES = "bookshelves",
  FORMATS = "formats",
  MEDIATYPES ="mediaType",
}

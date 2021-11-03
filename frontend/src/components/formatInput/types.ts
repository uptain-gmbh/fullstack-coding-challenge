import { Format, FormatsData } from "../../shared";

export interface FormatInputProps {
  value: FormatsData;
  onChange: (value: FormatsData) => void;
}

export type FormatFieldHandler = (field: Format) => React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;

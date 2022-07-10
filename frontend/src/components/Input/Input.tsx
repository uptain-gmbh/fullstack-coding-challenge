import React, { FC, useCallback, useState } from "react";
import { WrapperStyles, InputStyles, LabelStyles } from "./styled";
import { InputProps } from "./types";

export const Input: FC<InputProps> = ({ value, onChange, label, number }) => {
  const [focused, setFocused] = useState(false);

  const onFocusHandler = () => setFocused(true);

  const onBlurHandler = () => setFocused(false);

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      onChange(number ? newValue.replace(/\D/, "") : newValue);
    },
    [onChange, number]
  );

  return (
    <WrapperStyles>
      <LabelStyles>{label}</LabelStyles>
      <InputStyles
        focused={focused}
        value={value}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />
    </WrapperStyles>
  );
};

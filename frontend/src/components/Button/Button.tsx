import React, { FC, useCallback, useState } from "react";
import { ButtonStyles } from "./styled";
import { ButtonProps } from "./types";

export const Button: FC<ButtonProps> = ({ label, onClick, disabled }) => {
  const [pressed, setPressed] = useState(false);

  const onClickHandler = useCallback(() => {
    setPressed(true);
    onClick();
  }, [onClick]);

  const onReleaseHandler = () => setPressed(false);

  return (
    <ButtonStyles
      type="submit"
      disabled={!!disabled}
      pressed={pressed}
      onMouseDown={onClickHandler}
      onMouseUp={onReleaseHandler}
    >
      {label}
    </ButtonStyles>
  );
};

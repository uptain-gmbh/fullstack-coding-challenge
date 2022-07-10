import styled from "styled-components";
import { StyledThemePropsType } from "../../config";

interface StyledProps {
  pressed: boolean;
  disabled: boolean;
}

export const ButtonStyles = styled.button<StyledProps & StyledThemePropsType>`
  padding: 5px 10px;
  margin: 0 10px;
  border-radius: 15px;
  border: none;
  background-color: ${({ theme }) => theme.colors.light};
  box-shadow: ${({ theme, pressed, disabled }) =>
    disabled
      ? theme.colors.shadowNormal
      : pressed
      ? theme.colors.shadowPressed
      : theme.colors.shadowOut};
`;

import styled from "styled-components";
import { StyledThemePropsType } from "../../config";

interface InputProps {
  focused: boolean;
}

interface LabelProps {
  error?: boolean;
}

export const WrapperStyles = styled.div<StyledThemePropsType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const InputStyles = styled.input<InputProps & StyledThemePropsType>`
  background-color: transparent;
  outline: none;
  border-radius: 15px;
  border: none;
  padding: 5px 10px;
  box-shadow: ${({ theme, focused }) =>
    focused ? theme.colors.shadowPressed : theme.colors.shadowNormal};
  color: ${({ theme }) => theme.colors.dark};
  flex: 1;
`;

export const LabelStyles = styled.span<LabelProps & StyledThemePropsType>`
  font-size: 12px;
  margin-right: 5px;
  color: ${({ theme, error }) => error ? theme.colors.red : theme.colors.dark};
`;

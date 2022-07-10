import styled from "styled-components";
import { StyledThemePropsType } from "../../config";

interface StyleProps {
  focused: boolean;
}

export const WrapperStyles = styled.div<StyledThemePropsType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const InputStyles = styled.input<StyleProps & StyledThemePropsType>`
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

export const LabelStyles = styled.span<StyledThemePropsType>`
  font-size: 12px;
  margin-right: 5px;
  color: ${({ theme }) => theme.colors.dark};
`;

import styled from "styled-components";
import { StyledThemePropsType } from "../../config";

interface LabelProps {
  error?: boolean;
}

export const WrapperStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const LabelStyles = styled.span<LabelProps & StyledThemePropsType>`
  font-size: 12px;
  margin-right: 5px;
  color: ${({ theme, error }) => error ? theme.colors.red : theme.colors.dark};
`;

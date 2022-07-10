import styled from "styled-components";
import { StyledThemePropsType } from "../../config";

export const WrapperStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const LabelStyles = styled.span<StyledThemePropsType>`
  font-size: 12px;
  margin-right: 5px;
  color: ${({ theme }) => theme.colors.dark};
`;

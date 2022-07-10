import { StyledThemePropsType } from "./../../config/theme";
import styled from "styled-components";

export const TextStyles = styled.h1<StyledThemePropsType>`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.dark};
`;

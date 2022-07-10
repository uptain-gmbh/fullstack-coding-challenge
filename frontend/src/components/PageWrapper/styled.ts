import styled from "styled-components";
import { StyledThemePropsType } from "../../config";

export const WrapperStyles = styled.div<StyledThemePropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.light};
  flex: 1;
  flex-grow: 1;
  width: 100%;
  flex-wrap: wrap;
  min-height: 100vh;
`;

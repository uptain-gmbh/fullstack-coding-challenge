import styled from "styled-components";
import { StyledThemePropsType } from "../../config";

export const WrapperStyles = styled.div<StyledThemePropsType>`
  padding: 15px;
  margin: 0 10px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.light};
  box-shadow: ${({ theme }) => theme.colors.shadowOut};
  display: flex;
  flex-direction: column;
  width: 450px;
  margin: 40px;
`;

export const HeaderStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const FooterStyles = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

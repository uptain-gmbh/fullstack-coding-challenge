import React, { PropsWithChildren } from "react";
import { WrapperStyles } from "./styled";

export const PageWrapper = ({ children }: PropsWithChildren) => {
  return <WrapperStyles>{children}</WrapperStyles>;
};

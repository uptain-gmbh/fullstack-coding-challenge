import React, { PropsWithChildren } from "react";
import { TextStyles } from "./styled";

export const Text = ({ children }: PropsWithChildren) => {
  return <TextStyles>{children}</TextStyles>;
};

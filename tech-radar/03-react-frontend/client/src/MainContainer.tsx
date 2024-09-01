import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainContainer: FC<Props> = ({ children }) => {
  return <main>{children}</main>;
};

export default MainContainer;

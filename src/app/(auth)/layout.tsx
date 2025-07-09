import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid min-h-screen place-items-center bg-cotoneb3">
      {children}
    </div>
  );
};
export default Layout;

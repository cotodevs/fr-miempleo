import { FC, PropsWithChildren, ReactNode } from "react";
import NavBar from "@/shared/components/NavBar/NavBar";
import SideBar from "@/shared/components/SideBar";

const Layout: FC<
  PropsWithChildren & {
    pass: ReactNode;
  }
> = async ({ children, pass }) => {
  return (
    <>
      <NavBar />
      <SideBar>
        {children}
        {pass}
      </SideBar>
    </>
  );
};
export default Layout;

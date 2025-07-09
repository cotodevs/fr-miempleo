import Brand from "@/shared/components/NavBar/Brand";
import Menu from "@/shared/components/NavBar/Menu";

const NavBar = () => {
  return (
    <>
      <header className="fixed z-50 w-full bg-cotoneb3">
        <nav className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <Brand />
            <Menu />
          </div>
        </nav>
      </header>
      <div className="h-16"></div>
    </>
  );
};
export default NavBar;

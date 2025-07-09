"use client";

import { Dropdown, MenuProps } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks";

const Menu = () => {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: isLoading ? "Cargando..." : user?.friendlyName,
      disabled: true,
    },
    {
      key: 2,
      label: "Información de cuenta",
      onClick: () => {
        router.push("/info-cuenta");
      },
    },
    {
      key: 3,
      label: "Cerrar sesión",
      onClick: async () => {
        await logout();
      },
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]} arrow>
      <button>
        <FaUserCircle className="h-8 w-8 text-white" />
      </button>
    </Dropdown>
  );
};
export default Menu;

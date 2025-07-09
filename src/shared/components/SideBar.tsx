"use client";

import { Layout as AntdLayout, Avatar, Menu, Skeleton } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "@/shared/hooks";

const { Content, Sider } = AntdLayout;

const SideBar: FC<PropsWithChildren> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const MenuOptions: ItemType<MenuItemType>[] = [
    {
      key: "1",
      icon: <MdDashboard className="h-5 w-5" />,
      label: "Dashboard",
      onClick: () => router.push("/dashboard"),
    },
  ];

  return (
    <AntdLayout style={{ marginTop: 12, backgroundColor: "transparent" }}>
      <Sider
        width={250}
        collapsible
        trigger={null}
        breakpoint="lg"
        collapsedWidth={55}
        style={{
          backgroundColor: "transparent",
        }}
      >
        <article className="hidden w-full lg:mb-2 lg:flex lg:flex-col lg:items-center lg:justify-center">
          {isLoading ? (
            <Skeleton.Avatar size={72} active style={{ marginBottom: 8 }} />
          ) : (
            <Avatar size={72} style={{ marginBottom: 8, fontSize: 34 }}>
              {user?.name?.charAt(0)}
            </Avatar>
          )}
          {isLoading ? (
            <Skeleton.Input active style={{ height: 40 }} />
          ) : (
            <>
              <h2 className="text-center text-sm">{user?.name}</h2>
              <h2 className="text-center text-sm">{user?.job}</h2>
            </>
          )}
        </article>
        <Menu
          mode="inline"
          style={{ height: "100%", padding: 8 }}
          items={MenuOptions}
          defaultOpenKeys={["1", "2"]}
        />
      </Sider>
      <Content style={{ padding: "0 24px" }}>{children}</Content>
    </AntdLayout>
  );
};
export default SideBar;

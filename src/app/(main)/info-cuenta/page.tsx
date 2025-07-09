import PassChangeForm from "@/shared/components/PassChangeForm";
import { RoleEnum } from "@/shared/enums/roles.enum";
import { AuthUser } from "@/shared/interfaces/authuser";
import { fetcher } from "@/shared/lib/fetcher";
import { Avatar, Collapse, Divider } from "antd";

const getUser = () => fetcher<AuthUser>("/auth/me");

/**
 * Account page
 */
const AccountPage = async () => {
  const user = await getUser();

  return (
    <div className="flex justify-center">
      <div className="relative w-full gap-2 p-2 md:w-[520px]">
        <div className="flex justify-center">
          <Avatar size={128} alt={user.name} style={{ fontSize: 42 }}>
            {user.name.charAt(0)}
          </Avatar>
        </div>
        <article className="text-center">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="uppercase text-gray-500">
            <strong>Rol en el sistema:&nbsp;</strong>
            {RoleEnum[user.roleId]}
          </p>
          <p className="text-gray-500">
            <strong>Puesto:&nbsp;</strong>
            {user.job}
          </p>
        </article>
        <Divider style={{ marginTop: 8, marginBottom: 4 }} />
        <Collapse
          ghost
          items={[
            {
              key: "1",
              label: "Cambiar contraseña",
              children: <PassChangeForm />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AccountPage;

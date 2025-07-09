"use client";

import { Modal } from "antd";
import { Button } from "antd";
import { useAuth } from "@/shared/hooks";
import PassChangeForm from "@/shared/components/PassChangeForm";

const PasswordChangePage = () => {
  const { logout } = useAuth();

  return (
    <Modal
      width={420}
      open={true}
      closeIcon={null}
      footer={
        <Button onClick={async () => await logout()} danger type="primary">
          Cerrar sesión
        </Button>
      }
      title={"Cambiar contraseña"}
      centered
    >
      <PassChangeForm />
    </Modal>
  );
};
export default PasswordChangePage;

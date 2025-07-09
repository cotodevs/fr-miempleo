"use client";

import InputError from "@/shared/components/InputError";
import Label from "@/shared/components/Label";
import useAuth from "@/shared/hooks/useAuth";
import { Button, Input } from "antd";
import { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import { PassChangeFormValues, schema } from "./schema";
import { fetcher } from "@/shared/lib/swrFetcher";

const PassChangeForm = () => {
  const { user, login } = useAuth();
  const pathname = usePathname();
  const { trigger, isMutating } = useSWRMutation(
    "/auth/changePassword",
    fetcher<{
      collaboratorId: number;
      currentPassword: string;
      newPassword: string;
    }>("patch"),
  );

  const handlePasswordChange = async (
    values: PassChangeFormValues,
    { setSubmitting, resetForm }: FormikHelpers<PassChangeFormValues>,
  ) => {
    try {
      const response = await trigger({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        collaboratorId: user?.authUserId ?? -1,
      });
      if (!pathname.startsWith("/cambiar-contrasena")) {
        toast.success(response.message ?? "Contraseña cambiada con éxito");
      } else {
        /*
         * Si la ruta actual es /cambiar-contrasena, se necesita forzar el inicio de sesión
         * para actualizar el jwt con los nuevos datos, especialmente el flag requieresPasswordChange
         */
        await login(user?.userName ?? "", values.newPassword);
        toast.success(response.message ?? "Contraseña cambiada con éxito");
      }
      resetForm();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "Error al cambiar la contraseña",
        );
      }
    }
    setSubmitting(false);
  };

  return (
    <Formik<PassChangeFormValues>
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={handlePasswordChange}
      validationSchema={schema}
    >
      <Form>
        <div className="flex flex-col gap-2">
          <div>
            <Label>Contraseña actual</Label>
            <Field name="currentPassword" type="password" as={Input.Password} />
            <ErrorMessage name="currentPassword" component={InputError} />
          </div>
          <div>
            <Label>Contraseña nueva</Label>
            <Field name="newPassword" type="password" as={Input.Password} />
            <ErrorMessage name="newPassword" component={InputError} />
          </div>
          <div>
            <Label>Confirmar contraseña</Label>
            <Field name="confirmPassword" type="password" as={Input.Password} />
            <ErrorMessage name="confirmPassword" component={InputError} />
          </div>
        </div>
        <div className="my-2 flex justify-center">
          <Button type="primary" htmlType="submit" loading={isMutating}>
            {isMutating ? "Guardando cambios..." : "Guardar cambios"}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
export default PassChangeForm;

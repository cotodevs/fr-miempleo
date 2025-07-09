"use client";

import InputError from "@/shared/components/InputError";
import Label from "@/shared/components/Label";
import useAuth from "@/shared/hooks/useAuth";
import { Button, Input } from "antd";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Image from "next/image";
import { LoginFormValues, schema } from "./schema";

const LoginForm = () => {
  const { login } = useAuth();

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
  ) => {
    await login(values.userName, values.password);
    setSubmitting(false);
  };

  return (
    <Formik<LoginFormValues>
      initialValues={{
        userName: "",
        password: "",
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-96 rounded-xl bg-white p-6 shadow-md">
          <div className="relative mx-auto mb-2 h-24 w-72">
            <Image
              src="/images/cotoneb.png"
              className="h-full object-contain"
              alt="cotoneb"
              fill
            />
          </div>
          <fieldset className="flex w-full flex-col justify-center gap-2">
            <div>
              <Label htmlFor="userName">Nombre de usuario</Label>
              <Field id="userName" name="userName" as={Input} />
              <ErrorMessage name="userName" component={InputError} />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Field id="password" name="password" as={Input.Password} />
              <ErrorMessage name="password" component={InputError} />
            </div>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </fieldset>
          <p className="mt-2 text-sm text-gray-600">
            ¿Olvidaste tu contraseña?, por favor contacta con el área de
            informática.
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

import * as Yup from "yup";

export const schema = Yup.object().shape({
  userName: Yup.string().required("El nombre de usuario es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

export type LoginFormValues = Yup.InferType<typeof schema>;

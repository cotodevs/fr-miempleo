import * as Yup from "yup";

export const schema = Yup.object().shape({
  currentPassword: Yup.string().required("La contraseña actual es requerida"),
  newPassword: Yup.string()
    .required("La contraseña nueva es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: Yup.string()
    .required("La confirmación de la contraseña es requerida")
    .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden"),
});

export type PassChangeFormValues = Yup.InferType<typeof schema>;

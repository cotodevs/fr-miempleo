import { RoleEnum } from "@/shared/enums/roles.enum";

export const ROUTES: Record<string, { roles: RoleEnum[] }> = {
  "/dashboard": {
    roles: [RoleEnum.ADMIN, RoleEnum["UF-H"]],
  },
  "/info-cuenta": {
    roles: [RoleEnum.ADMIN, RoleEnum["UF-H"]],
  },
  "/cambiar-contrasena": {
    roles: [RoleEnum.ADMIN, RoleEnum["UF-H"]],
  },
  "/es-admin": {
    roles: [RoleEnum.ADMIN],
  },
};

export const MAIN_ROUTE = "/dashboard";

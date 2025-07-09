export interface AuthUser {
  authUserId: number;
  collaboratorId: number;
  name: string;
  friendlyName: string;
  photography: string;
  job: string;
  acronymJob: string;
  telephone: string;
  email: string;
  userName: string;
  immediateUserName: string;
  status: number;
  departmentId: number;
  roleId: number;
  agencyId: number;
  requieresPasswordChange: number;
  iat: number;
  exp: number;
}

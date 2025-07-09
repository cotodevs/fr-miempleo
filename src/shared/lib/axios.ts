import { BACKEND_URL } from "@/shared/config/env";
import axios from "axios";

export const backAxios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

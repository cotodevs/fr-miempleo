import { backAxios } from "@/shared/lib/axios";
import { AxiosRequestConfig } from "axios";

/**
 * Fetcher function for SWR hooks. It uses the backAxios instance to make the request.
 * T is the type of the request body, U is the type of the response body.
 * @param method HTTP method to use.
 * @returns A function that fetches data from the back-end.
 */
export const fetcher =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T = any, U = any>(method: "post" | "patch" | "put" | "delete") =>
    async (url: string, options: { arg: T }) => {
      const { arg } = options;
      const config = (
        method === "delete" ? { data: arg } : arg
      ) as AxiosRequestConfig<T> & T;

      const response = await backAxios[method](url, config);
      return response.data as U;
    };

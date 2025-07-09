import "server-only";
import { cookies } from "next/headers";

/**
 * Auth fetcher. Fetches data from the backend with the JWT cookie.
 * @param input - URL to fetch
 * @param requestInit - RequestInit object
 */
export const fetcher = async <T>(input: string, requestInit?: RequestInit) => {
  const jwt = cookies().get("jwt");

  const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + input, {
    ...requestInit,
    headers: {
      Cookie: `jwt=${jwt?.value}`,
    },
    credentials: "include",
  });

  return (await response.json()) as T;
};

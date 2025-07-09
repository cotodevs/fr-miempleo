import { AuthUser } from "@/shared/interfaces/authuser";
import { backAxios } from "@/shared/lib/axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { MAIN_ROUTE } from "@/shared/routes";
import { usePathname, useRouter } from "next/navigation";

/**
 * Custom hook to handle authentication
 */
const useAuth = () => {
  const { mutate: configMutate } = useSWRConfig();
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: user,
    isLoading,
    mutate,
  } = useSWRImmutable<AuthUser>(
    "/auth/me",
    async (url: string) => await backAxios.get(url).then((res) => res.data),
    {
      onErrorRetry: (_error, key) => {
        // Never retry for a specific key.
        if (key === "/auth/me") return;
      },
    },
  );

  const login = async (userName: string, password: string) => {
    try {
      await backAxios.post("/auth/login", {
        userName,
        password,
      });
      const updatedUser = await mutate();

      /*
       * Únicamente si la página actual es /iniciar-sesion y
       * el usuario requiere cambio de contraseña, redirigir a /cambiar-contrasena.
       * De lo contrario, redirigir a la ruta principal, esto es útil cuándo se
       * fuerza el inicio de sesión para la actualización del jwt (especialmente
       * el flag requieresPasswordChange) desde /cambiar-contrasena
       */
      if (
        pathname === "/iniciar-sesion" &&
        Boolean(updatedUser?.requieresPasswordChange)
      ) {
        router.push("/cambiar-contrasena");
        return;
      }

      // get the redirectTo parameter from the URL and redirect to it
      const url = new URL(window.location.href);
      const redirectTo = url.searchParams.get("redirectTo");

      if (!redirectTo) {
        window.location.href = MAIN_ROUTE;
      } else {
        window.location.href = redirectTo;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === "ECONNABORTED") {
          return toast.error(
            "La conexión ha tardado demasiado tiempo en responder. Por favor, intente de nuevo",
          );
        }

        if (error.code === "ERR_NETWORK") {
          return toast.error("No se pudo conectar al servidor");
        }

        toast.error(
          error.response?.data?.message ??
            "Ha ocurrido un error inesperado. Por favor, intente de nuevo",
        );
      }
    }
  };

  const logout = async () => {
    try {
      await backAxios.post("/auth/logout");
      // clear cache
      await configMutate(
        () => true, // which cache keys are updated
        undefined, // update cache data to `undefined`
        { revalidate: false }, // do not revalidate
      );
      window.location.href = "/iniciar-sesion";
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ??
            "Ha ocurrido un error inesperado. Por favor, intente de nuevo",
        );
      }
    }
  };

  return {
    user,
    isLoading,

    login,
    logout,
  };
};

export default useAuth;

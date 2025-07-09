import { MAIN_ROUTE, ROUTES } from "@/shared/routes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { backAxios } from "@/shared/lib/axios";
import { AuthUser } from "@/shared/interfaces/authuser";

const getUser = async (cookie: string) => {
  return await backAxios
    .get<AuthUser>("/auth/me", {
      headers: {
        Cookie: `jwt=${cookie}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
    .then((res) => res.data)
    .catch(() => null);
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") // exclude static files
  )
    return NextResponse.next();

  const jwt = cookies().get("jwt")?.value;
  const auth = jwt ? await getUser(jwt) : null;

  if (pathname !== MAIN_ROUTE && pathname == "/") {
    const newUrl = new URL(MAIN_ROUTE, req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  // validate if the user is NOT authenticated and that the requested route is among the routes stipulated before. Redirect to the login page
  if (!auth && Boolean(ROUTES[pathname])) {
    // get pathname for redirect to the login page
    // relative path, protocol and domain
    const newUrl = new URL(
      `/iniciar-sesion?redirectTo=${pathname}`,
      req.nextUrl.origin,
    );
    return NextResponse.redirect(newUrl);
  }

  // validate if the user is authenticated and that the requested route is the login page. Redirect to the main route
  if (auth && pathname === "/iniciar-sesion") {
    const newUrl = new URL(MAIN_ROUTE, req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  // validate if the user is authenticated and that the requested route is among the routes stipulated before
  if (auth && Boolean(ROUTES[pathname])) {
    // validate if password change is required
    const isRequired = Boolean(auth.requieresPasswordChange);

    // validate if the password change is required and if the current route is not the password change one. Redirect to the password change page
    if (isRequired && !pathname.startsWith("/cambiar-contrasena")) {
      const newUrl = new URL("/cambiar-contrasena", req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }

    // validate if the password change is not required and if the current route is the password change one. Redirect to the main route
    if (!isRequired && pathname.startsWith("/cambiar-contrasena")) {
      const newUrl = new URL(MAIN_ROUTE, req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }

    // Get the roles required for the requested route
    const roles = ROUTES[pathname].roles;

    // validate if the user's role is not among the roles required for the requested route. Redirect to the main route
    if (!roles.includes(auth.roleId)) {
      const newUrl = new URL(MAIN_ROUTE, req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }

    // Let the normal flow continue
    return NextResponse.next();
  }

  return NextResponse.next();
}

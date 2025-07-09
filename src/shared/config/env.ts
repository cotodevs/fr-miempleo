const BACKEND_URL = String(process.env.NEXT_PUBLIC_BACKEND_URL);

if (!BACKEND_URL) throw new Error("BACKEND_URL is not defined");

export { BACKEND_URL };

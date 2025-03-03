export const testSessionCookie = {
  name: "next-auth.session-token",
  value: "dummy",
  domain: "localhost",
  path: "/",
  httpOnly: true,
  secure: false,
  sameSite: "Lax" as const
};

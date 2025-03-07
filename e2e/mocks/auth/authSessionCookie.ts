// TODO: 型定義を追加する
export const authSessionCookie = {
  name: "next-auth.session-token",
  value: "dummy",
  domain: "localhost",
  path: "/",
  httpOnly: true,
  secure: false,
  sameSite: "Lax" as const
};

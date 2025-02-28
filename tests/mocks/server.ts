import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

// モックで認証のサーバを起動
export function startServer() {
  server.listen({ onUnhandledRequest: "bypass" });
  console.log("MSW Server started");
}

export function stopServer() {
  server.close();
  console.log("MSW Server stopped");
}

export function resetServer() {
  server.resetHandlers();
  console.log("MSW Server handlers reset");
}

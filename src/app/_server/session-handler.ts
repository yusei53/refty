import type { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import type { HTTPMethod } from "../_shared/type/httpMethod";
import type { Session } from "next-auth";
import { getUserSession } from "../_shared/get-user-session";
import { internalServerError, unauthorizedError } from "./http-error";

type Handler<T> = (args: {
  req: NextRequest;
  session: Session["user"];
}) => Promise<T>;

export async function sessionHandler<T>(
  req: NextRequest,
  domain: string,
  handler: Handler<T>
): Promise<T | NextResponse> {
  try {
    const session = await getUserSession();
    if (!session) {
      return unauthorizedError("認証されていません");
    }
    return await handler({ req, session });
  } catch (error) {
    return internalServerError(req.method as HTTPMethod, domain, error);
  }
}

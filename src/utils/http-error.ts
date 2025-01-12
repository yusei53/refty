import { NextResponse } from "next/server";
import type { HTTPMethod } from "./fetchURL";

export type ErrorCode = 400 | 401 | 403 | 404 | 500;

const httpError = (message: string, status: ErrorCode) =>
  NextResponse.json({ message }, { status });

export const badRequestError = (message: string) => httpError(message, 400);

export const unauthorizedError = (message: string) => httpError(message, 401);

export const forbiddenError = (message: string) => httpError(message, 403);

export const notFoundError = (message: string) => httpError(message, 404);

export const internalServerError = (
  httpMethod: HTTPMethod,
  domain: string,
  error: unknown
) => {
  console.error(
    `${domain}の${httpMethod}メソッドで500エラーが発生しました`,
    error
  );
  httpError(`${domain}の${httpMethod}メソッドで500エラーが発生しました`, 500);
};

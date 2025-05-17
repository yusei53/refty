import { request } from "./util/request";
import {
  reflection,
  yusei53Reflection
} from "@/e2e/mocks/reflection/reflection";

describe("未認証ユーザー", () => {
  test("編集ページにアクセスした場合、401エラーが返される", async () => {
    const response = await request.unauthorized.GET(
      `/api/reflection/detail/${reflection.reflectionCUID}/edit`
    );
    expect(response).toBe(401);
  });
});

describe("認証済みユーザー", () => {
  test("指定されたreflectionCUIDが自身の投稿でなく、編集ページにアクセスした場合、403エラーが返される", async () => {
    const response = await request.authorized.GET(
      `/api/reflection/detail/${yusei53Reflection.reflectionCUID}/edit`
    );
    expect(response).toBe(403);
  });

  test("指定されたreflectionCUIDが存在せず、編集ページにアクセスした場合、404エラーが返される", async () => {
    const response = await request.authorized.GET(
      `/api/reflection/detail/not-exist-reflection-cuid/edit`
    );
    expect(response).toBe(404);
  });

  test("指定されたreflectionCUIDが自身の投稿であり、編集ページにアクセスした場合、200が返される", async () => {
    const response = await request.authorized.GET(
      `/api/reflection/detail/${reflection.reflectionCUID}/edit`
    );
    expect(response).toBe(200);
  });
});

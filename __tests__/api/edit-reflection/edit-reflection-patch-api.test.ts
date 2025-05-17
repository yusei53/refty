import { request } from "../../util/request";
import {
  reflection,
  requestReflection,
  yusei53Reflection
} from "@/e2e/mocks/reflection/reflection";

describe("未認証ユーザー", () => {
  test("編集するリクエストが飛ばされた場合、401エラーが返される", async () => {
    const response = await request.unauthorized.PATCH(
      `/api/reflection/detail/${reflection.reflectionCUID}/edit`,
      requestReflection
    );
    expect(response.status).toBe(401);
  });
});

describe("認証済みユーザー", () => {
  test("指定されたreflectionCUIDが自身の投稿でなく、編集するリクエストが飛ばされた場合、403エラーが返される", async () => {
    const response = await request.authorized.PATCH(
      `/api/reflection/detail/${yusei53Reflection.reflectionCUID}/edit`,
      requestReflection
    );
    expect(response.status).toBe(403);
  });

  test("指定されたreflectionCUIDが存在せず、編集するリクエストが飛ばされた場合、404エラーが返される", async () => {
    const response = await request.authorized.PATCH(
      `/api/reflection/detail/not-exist-reflection-cuid/edit`,
      requestReflection
    );
    expect(response.status).toBe(404);
  });

  test("指定されたreflectionCUIDが自身の投稿であり、編集するリクエストが飛ばされた場合、200が返される", async () => {
    const response = await request.authorized.PATCH(
      `/api/reflection/detail/${reflection.reflectionCUID}/edit`,
      requestReflection
    );
    expect(response.status).toBe(200);
  });
});

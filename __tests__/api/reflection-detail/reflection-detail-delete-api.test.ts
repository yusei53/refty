import { request } from "../../util/request";
import { reflection } from "@/e2e/mocks/reflection/reflection";

describe("未認証ユーザー", () => {
  test("未認証ユーザーが振り返りを削除しようとした場合、401エラーが返される", async () => {
    const response = await request.unauthorized.DELETE(
      `/api/reflection/detail/cmas23q220001mm51sqrv9w0u`
    );
    expect(response.status).toBe(401);
  });
});

describe("認証済みユーザー", () => {
  test("存在しない振り返りを削除しようとした場合、404エラーが返される", async () => {
    const response = await request.authorized.DELETE(
      `/api/reflection/detail/not-exist-reflection`
    );
    expect(response.status).toBe(404);
  });

  // TODO: 他人の振り返りを削除しようとした場合、403エラーが返される

  test("自身の振り返りを削除した場合、200が返される", async () => {
    const response = await request.authorized.DELETE(
      `/api/reflection/detail/${reflection.reflectionCUID}`
    );
    expect(response.status).toBe(200);
  });
});

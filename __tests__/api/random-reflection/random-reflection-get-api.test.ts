import { request } from "../../util/request";
import { refty } from "@/e2e/mocks/auth/user";

describe("未認証ユーザー", () => {
  test("未認証ユーザーがランダムな振り返りを取得しようとした場合、403エラーが返される", async () => {
    const response = await request.unauthorized.GET(
      `/api/${refty.username}/random-reflection`
    );
    expect(response.status).toBe(403);
  });
});

describe("認証済みユーザー", () => {
  test("存在しないユーザーのランダムな振り返りを取得しようとした場合、404エラーが返される", async () => {
    const response = await request.authorized.GET(
      `/api/not-exist-username/random-reflection`
    );
    expect(response.status).toBe(404);
  });

  test("他人のランダムな振り返りを取得しようとした場合、403エラーが返される", async () => {
    const response = await request.authorized.GET(
      `/api/yusei53/random-reflection`
    );
    expect(response.status).toBe(403);
  });

  test("自身のランダムな振り返りを取得した場合、200が返される", async () => {
    const response = await request.authorized.GET(
      `/api/${refty.username}/random-reflection`
    );
    expect(response.status).toBe(200);
  });
});

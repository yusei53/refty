import { request } from "../../util/request";
import { refty } from "@/e2e/mocks/auth/user";

describe("未認証ユーザー", () => {
  test("存在しないユーザーのプロフィール設定を取得しようとした場合、404エラーが返される", async () => {
    const response = await request.unauthorized.GET(
      `/api/not-exist-username/profile-setting`
    );
    expect(response.status).toBe(404);
  });

  // TODO: sessionがない場合404を返す
});

describe("認証済みユーザー", () => {
  test("存在しないユーザーのプロフィール設定を取得しようとした場合、404エラーが返される", async () => {
    const response = await request.authorized.GET(
      `/api/not-exist-username/profile-setting`
    );
    expect(response.status).toBe(404);
  });

  // TODO: 他人のsessionを使用してフォルダを作成した場合、403エラーが返されるテストを追加

  test("存在するユーザーのプロフィール設定を取得した場合、200が返される", async () => {
    const response = await request.authorized.GET(
      `/api/${refty.username}/profile-setting`
    );
    expect(response.status).toBe(200);
  });
});

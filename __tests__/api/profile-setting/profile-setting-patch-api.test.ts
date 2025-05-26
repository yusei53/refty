import { request } from "../../util/request";
import { refty } from "@/e2e/mocks/auth/user";

describe("未認証ユーザー", () => {
  test("未認証ユーザーがプロフィール設定を更新しようとした場合、401エラーが返される", async () => {
    const response = await request.unauthorized.PATCH(
      `/api/${refty.username}/profile-setting`,
      {
        bio: "test bio",
        goal: "test goal",
        website: "https://example.com"
      }
    );
    expect(response.status).toBe(401);
  });
});

describe("認証済みユーザー", () => {
  test("自身のプロフィール設定を更新した場合、201が返される", async () => {
    const response = await request.authorized.PATCH(
      `/api/${refty.username}/profile-setting`,
      {
        bio: "test bio",
        goal: "test goal",
        website: "https://example.com"
      }
    );
    expect(response.status).toBe(201);
  });

  // TODO: 他人のsessionを使用してフォルダを作成した場合、403エラーが返されるテストを追加

  // TODO: 存在しないユーザーのプロフィール設定を更新しようとした場合、404エラーが返されるテストを追加
});

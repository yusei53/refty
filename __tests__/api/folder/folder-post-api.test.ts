import { request } from "../../util/request";
import { refty } from "@/e2e/mocks/auth/user";

describe("未認証ユーザー", () => {
  test("未認証ユーザーがフォルダを作成しようとした場合、401エラーが返される", async () => {
    const response = await request.unauthorized.POST(
      `/api/${refty.username}/folder`,
      {
        name: "test-folder"
      }
    );
    expect(response.status).toBe(401);
  });
});

describe("認証済みユーザー", () => {
  // TODO: 他人のsessionを使用してフォルダを作成した場合、403エラーが返されるテストを追加

  test("自身のフォルダを作成した場合、201が返される", async () => {
    const response = await request.authorized.POST(
      `/api/${refty.username}/folder`,
      {
        name: "test-folder"
      }
    );
    expect(response.status).toBe(201);
  });
});

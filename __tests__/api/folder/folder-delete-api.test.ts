import { request } from "../../util/request";
import { refty, reftyFolder } from "@/e2e/mocks/auth/user";

describe("未認証ユーザー", () => {
  test("未認証ユーザーがフォルダを削除しようとした場合、401エラーが返される", async () => {
    const response = await request.unauthorized.DELETE(
      `/api/${refty.username}/folder/test-folder-uuid`
    );
    expect(response.status).toBe(401);
  });
});

describe("認証済みユーザー", () => {
  // TODO: 他人のsessionを使用してフォルダを作成した場合、403エラーが返されるテストを追加

  test("存在しないフォルダを削除しようとした場合、404エラーが返される", async () => {
    const response = await request.authorized.DELETE(
      `/api/${refty.username}/folder/not-exist-folder-uuid`
    );
    expect(response.status).toBe(404);
  });

  test("自身のフォルダを削除した場合、200が返される", async () => {
    const response = await request.authorized.DELETE(
      `/api/${refty.username}/folder/${reftyFolder.folderUUID}`
    );
    expect(response.status).toBe(200);
  });
});

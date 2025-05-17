import { request } from "../../util/request";
import { refty, reftyFolder } from "@/e2e/mocks/auth/user";

const reflectionList = [
  "cmas23q220001mm51sqrv9w0u",
  "cm837puui00054rt5e0ekho91"
];

describe("未認証ユーザー", () => {
  test("未認証ユーザーが一括選択を実行しようとした場合、401エラーが返される", async () => {
    const response = await request.unauthorized.POST(
      `/api/reflection/bulk-select`,
      {
        reflectionCUID: reflectionList,
        folderUUID: reftyFolder.folderUUID,
        username: refty.username
      }
    );
    expect(response.status).toBe(401);
  });
});

describe("認証済みユーザー", () => {
  test("必須パラメータが不足している場合、400エラーが返される", async () => {
    const response = await request.authorized.POST(
      `/api/reflection/bulk-select`,
      {
        reflectionCUID: null,
        username: refty.username
      }
    );
    expect(response.status).toBe(400);
  });

  test("選択した投稿に自身の投稿以外が含まれている場合、403エラーが返される", async () => {
    const response = await request.authorized.POST(
      `/api/reflection/bulk-select`,
      {
        reflectionCUID: [...reflectionList, "dummyid"],
        folderUUID: reftyFolder.folderUUID,
        username: refty.username
      }
    );
    expect(response.status).toBe(403);
  });

  test("自身の投稿を一括選択した場合、200が返される", async () => {
    const response = await request.authorized.POST(
      `/api/reflection/bulk-select`,
      {
        reflectionCUID: reflectionList,
        folderUUID: reftyFolder.folderUUID,
        username: refty.username
      }
    );
    expect(response.status).toBe(200);
  });
});

import { request } from "../../util/request";
import { refty } from "@/e2e/mocks/auth/user";

describe("未認証ユーザー", () => {
  test("指定したユーザーネームが存在しない場合、404エラーが返される", async () => {
    const response = await request.unauthorized.GET(
      `/api/not-exist-username/report/all-content`
    );
    expect(response.status).toBe(404);
  });

  test("公開のレポートにアクセスした場合、200が返される", async () => {
    const response = await request.unauthorized.GET(
      `/api/yusei53/report/all-content`
    );
    expect(response.status).toBe(200);
  });
});

// TODO: 非公開かつ他人のレポートにアクセスした場合、403エラーが返されるテストを追加

describe("認証済みユーザー", () => {
  test("指定したユーザーネームが存在しない場合、404エラーが返される", async () => {
    const response = await request.authorized.GET(
      `/api/not-exist-username/report/all-content`
    );
    expect(response.status).toBe(404);
  });

  test("非公開かつ自身のレポートにアクセスした場合、200が返される", async () => {
    const response = await request.authorized.GET(
      `/api/${refty.username}/report/all-content`
    );
    expect(response.status).toBe(200);
  });

  test("公開のレポートにアクセスした場合、200が返される", async () => {
    const response = await request.authorized.GET(
      `/api/yusei53/report/all-content`
    );
    expect(response.status).toBe(200);
  });
});

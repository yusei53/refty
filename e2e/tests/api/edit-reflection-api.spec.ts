import { expect, test } from "@playwright/test";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";
import {
  reflection,
  requestReflection
} from "@/e2e/mocks/reflection/reflection";

test.describe("未認証ユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });
  test("401エラーが返される", async ({ page }) => {
    const response = await page.request.patch(
      `/api/reflection/detail/${reflection.reflectionCUID}/edit`,
      {
        data: requestReflection
      }
    );
    expect(response.status()).toBe(401);
  });
});

test.describe("認証済みユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().addCookies([authSessionCookie]);
  });

  test("指定された投稿のCUIDが存在しない場合、404エラーが返される", async ({
    page
  }) => {
    const response = await page.request.patch(
      `/api/reflection/detail/abcdef/edit`,
      {
        data: requestReflection
      }
    );
    expect(response.status()).toBe(404);
  });

  test("指定された投稿のCUIDが自身の投稿でない場合、403エラーが返される", async ({
    page
  }) => {
    const response = await page.request.patch(
      // TODO: yusei53の投稿を指定しているので、リフティ公式のサブ垢を作ってCUIDを置き換えたい
      `/api/reflection/detail/cm8ad31x00003ni588xehdmpg/edit`,
      { data: requestReflection }
    );
    expect(response.status()).toBe(403);
  });

  test("指定された投稿のCUIDが自身の投稿である場合、200が返される", async ({
    page
  }) => {
    const response = await page.request.patch(
      `/api/reflection/detail/${reflection.reflectionCUID}/edit`,
      { data: requestReflection }
    );
    expect(response.status()).toBe(200);
  });
});

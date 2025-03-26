import { expect, test } from "@playwright/test";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";
import { refty } from "@/e2e/mocks/auth/user";

test.describe("未認証ユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test("指定したユーザーネームが存在しない場合、404エラーが返される", async ({
    page
  }) => {
    const response = await page.request.get(
      `/api/not-exist-username/report/status`
    );
    expect(response.status()).toBe(404);
  });

  test("非公開のレポートにアクセスした場合、403エラーが返される", async ({
    page
  }) => {
    const response = await page.request.get(
      `/api/${refty.username}/report/status`
    );
    expect(response.status()).toBe(403);
  });

  test("公開のレポートにアクセスした場合、200が返される", async ({ page }) => {
    const response = await page.request.get(`/api/yusei53/report/status`);
    expect(response.status()).toBe(200);

    const responseAllContent = await page.request.get(
      `/api/yusei53/report/all-content`
    );
    expect(responseAllContent.status()).toBe(200);

    const responsePublicPrivate = await page.request.get(
      `/api/yusei53/report/public-private-reflection`
    );
    expect(responsePublicPrivate.status()).toBe(200);

    const responseReflectionTime = await page.request.get(
      `/api/yusei53/report/reflection-time`
    );
    expect(responseReflectionTime.status()).toBe(200);

    const responseReflectionCount = await page.request.get(
      `/api/yusei53/reflections-count`
    );
    expect(responseReflectionCount.status()).toBe(200);

    const responseTagCount = await page.request.get(
      `/api/yusei53/report/tag-count`
    );
    expect(responseTagCount.status()).toBe(200);
  });
});

test.describe("認証済みユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().addCookies([authSessionCookie]);
  });

  test("指定したユーザーネームが存在しない場合、404エラーが返される", async ({
    page
  }) => {
    const response = await page.request.get(
      `/api/not-exist-username/report/status`
    );
    expect(response.status()).toBe(404);
  });

  test("非公開のレポートにアクセスした場合、403エラーが返される", async ({
    page
  }) => {
    const response = await page.request.get(`/api/yoshidanoline/report/status`);
    expect(response.status()).toBe(403);
  });

  test("非公開かつ自身のレポートにアクセスした場合、200が返される", async ({
    page
  }) => {
    const response = await page.request.get(
      `/api/${refty.username}/report/status`
    );
    expect(response.status()).toBe(200);

    const responseAllContent = await page.request.get(
      `/api/${refty.username}/report/all-content`
    );
    expect(responseAllContent.status()).toBe(200);

    const responsePublicPrivate = await page.request.get(
      `/api/${refty.username}/report/public-private-reflection`
    );
    expect(responsePublicPrivate.status()).toBe(200);

    const responseReflectionTime = await page.request.get(
      `/api/${refty.username}/report/reflection-time`
    );
    expect(responseReflectionTime.status()).toBe(200);

    const responseReflectionCount = await page.request.get(
      `/api/yusei53/reflections-count`
    );
    expect(responseReflectionCount.status()).toBe(200);

    const responseTagCount = await page.request.get(
      `/api/${refty.username}/report/tag-count`
    );
    expect(responseTagCount.status()).toBe(200);
  });

  test("公開のレポートにアクセスした場合、200が返される", async ({ page }) => {
    const response = await page.request.get(`/api/yusei53/report/status`);
    expect(response.status()).toBe(200);

    const responseAllContent = await page.request.get(
      `/api/yusei53/report/all-content`
    );
    expect(responseAllContent.status()).toBe(200);

    const responsePublicPrivate = await page.request.get(
      `/api/yusei53/report/public-private-reflection`
    );
    expect(responsePublicPrivate.status()).toBe(200);

    const responseReflectionTime = await page.request.get(
      `/api/yusei53/report/reflection-time`
    );
    expect(responseReflectionTime.status()).toBe(200);

    const responseReflectionCount = await page.request.get(
      `/api/yusei53/reflections-count`
    );
    expect(responseReflectionCount.status()).toBe(200);

    const responseTagCount = await page.request.get(
      `/api/yusei53/report/tag-count`
    );
    expect(responseTagCount.status()).toBe(200);
  });
});

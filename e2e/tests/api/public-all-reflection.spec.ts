import { expect, test } from "@playwright/test";
import type { Reflection } from "@prisma/client";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";

test.describe("未認証ユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test("200が返される", async ({ page }) => {
    const response = await page.request.get(`/api/reflection`);
    expect(response.status()).toBe(200);
  });

  test("公開ステータスの投稿のみが返される", async ({ page }) => {
    const response = await page.request.get(`/api/reflection`);
    const data: { reflections: Reflection[] } = await response.json();

    data.reflections.forEach((reflection: Reflection) => {
      expect(reflection.isPublic).toBeTruthy();
    });
  });

  test("1ページ目は12件の投稿が返される", async ({ page }) => {
    const response = await page.request.get(`/api/reflection`);
    const data: { reflections: Reflection[] } = await response.json();

    expect(data.reflections.length).toBe(12);
  });

  test("2ページ目は1ページ目の投稿よりも投稿日が古い投稿が返される", async ({
    page
  }) => {
    const firstPageResponse = await page.request.get(`/api/reflection`);
    const firstPageData: { reflections: Reflection[] } =
      await firstPageResponse.json();
    const secondPageResponse = await page.request.get(`/api/reflection?page=2`);
    const secondPageData: { reflections: Reflection[] } =
      await secondPageResponse.json();

    if (
      firstPageData.reflections.length === 12 &&
      secondPageData.reflections.length >= 1
    ) {
      const lastItemInFirstPage = new Date(
        firstPageData.reflections[11].createdAt
      );
      const firstItemInSecondPage = new Date(
        secondPageData.reflections[0].createdAt
      );

      // NOTE: 12件目の投稿より13件目の投稿が古いことを確認するテスト
      expect(firstItemInSecondPage.getTime()).toBeLessThanOrEqual(
        lastItemInFirstPage.getTime()
      );
    }
  });
});

test.describe("認証済みユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().addCookies([authSessionCookie]);
  });

  test("200が返される", async ({ page }) => {
    const response = await page.request.get(`/api/reflection`);
    expect(response.status()).toBe(200);
  });

  test("公開ステータスの投稿のみが返される", async ({ page }) => {
    const response = await page.request.get(`/api/reflection`);
    const data: { reflections: Reflection[] } = await response.json();

    data.reflections.forEach((reflection: Reflection) => {
      expect(reflection.isPublic).toBeTruthy();
    });
  });

  test("1ページ目は12件の投稿が返される", async ({ page }) => {
    const response = await page.request.get(`/api/reflection`);
    const data: { reflections: Reflection[] } = await response.json();

    expect(data.reflections.length).toBe(12);
  });

  test("2ページ目は1ページ目の投稿よりも投稿日が古い投稿が返される", async ({
    page
  }) => {
    const firstPageResponse = await page.request.get(`/api/reflection`);
    const firstPageData: { reflections: Reflection[] } =
      await firstPageResponse.json();
    const secondPageResponse = await page.request.get(`/api/reflection?page=2`);
    const secondPageData: { reflections: Reflection[] } =
      await secondPageResponse.json();

    if (
      firstPageData.reflections.length === 12 &&
      secondPageData.reflections.length >= 1
    ) {
      const lastItemInFirstPage = new Date(
        firstPageData.reflections[11].createdAt
      );
      const firstItemInSecondPage = new Date(
        secondPageData.reflections[0].createdAt
      );

      // NOTE: 12件目の投稿より13件目の投稿が古いことを確認するテスト
      expect(firstItemInSecondPage.getTime()).toBeLessThanOrEqual(
        lastItemInFirstPage.getTime()
      );
    }
  });
});

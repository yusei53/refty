import { expect, test } from "@playwright/test";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";

test.describe("未認証ユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test("投稿ページにアクセスするとログインページへリダイレクトされる", async ({
    page
  }) => {
    await page.goto("/post");
    expect(page.url()).toContain("/login");
  });
});

test.describe("認証済みユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().addCookies([authSessionCookie]);
    await page.goto("/post");
  });

  test("投稿ページに正常にアクセスできる", async ({ page }) => {
    expect(page.url()).toContain("/post");
  });

  test("titleとcontentに文字を入力し投稿した時、自身の投稿一覧ページにリダイレクトされる", async ({
    page
  }) => {
    (await page.waitForSelector("input#title")).fill("テストのtitle");
    (await page.waitForSelector(".tiptap.ProseMirror")).fill("テストのcontent");
    await page.locator("button[type='submit']").click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/test");
  });
});

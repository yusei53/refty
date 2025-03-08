import { expect, test } from "@playwright/test";
import { authJwt } from "@/e2e/mocks/auth/authJwt";
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

  test("titleとcontentに文字が入力された状態で投稿ボタンを押すと、自身の投稿一覧ページにリダイレクトされる", async ({
    page
  }) => {
    (await page.waitForSelector("input#title")).fill("テストのtitle");
    (await page.waitForSelector(".tiptap.ProseMirror")).fill("テストのcontent");
    await page.locator("button[type='submit']").click();
    await page.waitForLoadState("networkidle");
    const jwt = await authJwt.decode();
    expect(page.url()).toContain(jwt?.username);
  });

  test("titleが未入力の状態で投稿ボタンを押すと、エラーメッセージが表示される", async ({
    page
  }) => {
    (await page.waitForSelector(".tiptap.ProseMirror")).fill("テストのcontent");
    await page.locator("button[type='submit']").click();
    await expect(
      page.locator("text=タイトルは1文字以上で入力してください。")
    ).toBeVisible();
  });

  test("titleが40文字を超えた状態で投稿ボタンを押すと、エラーメッセージが表示される", async ({
    page
  }) => {
    (await page.waitForSelector("input#title")).fill("a".repeat(41));
    (await page.waitForSelector(".tiptap.ProseMirror")).fill("テストのcontent");
    await page.locator("button[type='submit']").click();
    await expect(
      page.locator("text=タイトルは40文字以内で入力してください。")
    ).toBeVisible();
  });

  test("titleが空白文字のみの状態で投稿ボタンを押すと、エラーメッセージが表示される", async ({
    page
  }) => {
    (await page.waitForSelector("input#title")).fill(" ");
    (await page.waitForSelector(".tiptap.ProseMirror")).fill("テストのcontent");
    await page.locator("button[type='submit']").click();
    await expect(
      page.locator("text=タイトルは1文字以上で入力してください。")
    ).toBeVisible();
  });

  test("contentが未入力の状態で投稿ボタンを押すと、エラーメッセージが表示される", async ({
    page
  }) => {
    (await page.waitForSelector("input#title")).fill("テストのtitle");
    await page.locator("button[type='submit']").click();
    await expect(
      page.locator("text=1文字以上で入力してください。")
    ).toBeVisible();
  });
});

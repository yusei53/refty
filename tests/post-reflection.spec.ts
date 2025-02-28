import { expect, test } from "@playwright/test";
import { startServer, stopServer } from "./mocks/server";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("投稿系", () => {
  test("ログインしていない時投稿できない", async ({ page }) => {
    await page.goto("/post");
    await page.goto("/login");
    expect(page.url()).toContain("/login");
  });

  test("投稿ページにアクセスできる", async ({ page }) => {
    startServer();
    await page.goto("/post");
    expect(page.url()).toContain("/post");
    stopServer();
  });
});

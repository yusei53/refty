import { expect, test } from "@playwright/test";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";

test.describe("認証済みユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().addCookies([authSessionCookie]);
    await page.goto("/post");
    await page.locator("input#title").fill("下書きテストのtitle");
    await page.locator(".tiptap.ProseMirror").fill("下書きテストのcontent");
  });

  test("下書き一覧ボタンをクリックすると、ポップアップに「下書きのタイトル」が表示される", async ({
    page
  }) => {
    await page.goto("/");
    await page.goto("/post");
    await page.locator("[data-testid='draft-list']").click();

    const draftTitle = await page
      .locator("button >> div >> p")
      .first()
      .textContent();
    expect(draftTitle).toBe("下書きテストのtitle");
  });

  test("下書き一覧で下書きを選択すると、その内容がフォームに表示される", async ({
    page
  }) => {
    await page.goto("/");
    await page.goto("/post");
    await page.locator("[data-testid='draft-list']").click();

    await page.getByRole("button", { name: /下書きテストのtitle/i }).click();

    const titleInForm = await page.locator("input#title").inputValue();
    const contentInForm = await page
      .locator(".tiptap.ProseMirror")
      .textContent();

    expect(titleInForm).toBe("下書きテストのtitle");
    expect(contentInForm).toContain("下書きテストのcontent");
  });

  test("下書き一覧で下書きを削除ボタンを押すと、下書きが削除される", async ({
    page
  }) => {
    await page.goto("/");
    await page.goto("/post");
    await page.locator("[data-testid='draft-list']").click();

    await page.locator("[data-testid='delete-draft-icon']").click();
    await expect(page.getByText("下書き一覧")).toBeHidden();
  });
});

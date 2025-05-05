import { expect, test } from "@playwright/test";
import { authSessionCookie } from "@/e2e/mocks/auth/authSessionCookie";

test.describe("認証済みユーザー", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().addCookies([authSessionCookie]);
    await page.goto("/post");
    await page.locator("input#title").fill("下書きテストのtitle");
    await page.locator(".tiptap.ProseMirror").fill("下書きテストのcontent");

    await page.goto("/");
    await page.goto("/post");

    await page.locator(".draft-list").click();
  });

  test("titleとcontentが入力された状態でページを離れ、再度アクセスし下書き一覧ボタンをクリックすると、ポップアップに「下書きのタイトル」が表示される", async ({
    page
  }) => {
    const draftTitle = await page
      .locator(".MuiListItemText-primary")
      .textContent();
    expect(draftTitle).toBe("下書きテストのtitle");
  });

  test("下書き一覧で下書きを選択すると、その内容がフォームに表示される", async ({
    page
  }) => {
    await page.getByText("下書きテストのtitle").click();

    const title = await page.locator("input#title").inputValue();
    const content = await page.locator(".tiptap.ProseMirror").textContent();
    expect(title).toBe("下書きテストのtitle");
    expect(content).toContain("下書きテストのcontent");
  });

  test("下書き一覧で下書きを削除ボタンを押すと、下書きが削除される", async ({
    page
  }) => {
    await page.locator(".MuiIconButton-root").click();
    await expect(page.getByText("下書きはありません")).toBeVisible();
  });
});

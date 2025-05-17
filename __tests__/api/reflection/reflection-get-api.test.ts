import type { Reflection } from "@prisma/client";
import { request } from "../../util/request";
describe("未認証ユーザー", () => {
  test("200が返される", async () => {
    const response = await request.unauthorized.GET("/api/reflection");
    expect(response.status).toBe(200);
  });

  test("公開ステータスの投稿のみが返される", async () => {
    const response = await request.unauthorized.GET("/api/reflection");
    expect(response.data).toBeDefined();
    const data = response.data as { reflections: Reflection[] };

    data.reflections.forEach((reflection: Reflection) => {
      expect(reflection.isPublic).toBeTruthy();
    });
  });

  test("1ページ目は12件の投稿が返される", async () => {
    const response = await request.unauthorized.GET("/api/reflection");
    expect(response.data).toBeDefined();
    const data = response.data as { reflections: Reflection[] };

    expect(data.reflections.length).toBe(12);
  });

  test("2ページ目は1ページ目の投稿よりも投稿日が古い投稿が返される", async () => {
    const firstPageResponse = await request.unauthorized.GET("/api/reflection");
    const firstPageData = firstPageResponse.data as {
      reflections: Reflection[];
    };
    const secondPageResponse = await request.unauthorized.GET(
      "/api/reflection?page=2"
    );
    const secondPageData = secondPageResponse.data as {
      reflections: Reflection[];
    };

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

      expect(firstPageResponse.data).toBeDefined();
      expect(secondPageResponse.data).toBeDefined();
      // NOTE: 12件目の投稿より13件目の投稿が古いことを確認
      expect(firstItemInSecondPage.getTime()).toBeLessThanOrEqual(
        lastItemInFirstPage.getTime()
      );
    }
  });
});

describe("認証済みユーザー", () => {
  test("200が返される", async () => {
    const response = await request.authorized.GET("/api/reflection");
    expect(response.status).toBe(200);
  });

  test("公開ステータスの投稿のみが返される", async () => {
    const response = await request.authorized.GET("/api/reflection");
    expect(response.data).toBeDefined();
    const data = response.data as { reflections: Reflection[] };

    data.reflections.forEach((reflection: Reflection) => {
      expect(reflection.isPublic).toBeTruthy();
    });
  });

  test("1ページ目は12件の投稿が返される", async () => {
    const response = await request.authorized.GET("/api/reflection");
    expect(response.data).toBeDefined();
    const data = response.data as { reflections: Reflection[] };

    expect(data.reflections.length).toBe(12);
  });

  test("2ページ目は1ページ目の投稿よりも投稿日が古い投稿が返される", async () => {
    const firstPageResponse = await request.authorized.GET("/api/reflection");
    const firstPageData = firstPageResponse.data as {
      reflections: Reflection[];
    };
    const secondPageResponse = await request.authorized.GET(
      "/api/reflection?page=2"
    );
    const secondPageData = secondPageResponse.data as {
      reflections: Reflection[];
    };

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

      expect(firstPageResponse.data).toBeDefined();
      expect(secondPageResponse.data).toBeDefined();
      // NOTE: 12件目の投稿より13件目の投稿が古いことを確認
      expect(firstItemInSecondPage.getTime()).toBeLessThanOrEqual(
        lastItemInFirstPage.getTime()
      );
    }
  });
});

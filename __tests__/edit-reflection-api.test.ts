import fetch from "node-fetch";
import {
  reflection,
  requestReflection,
  yusei53Reflection
} from "@/e2e/mocks/reflection/reflection";

const BASE_URL = "http://localhost:3000";

const createAuthHeaders = () => ({
  "Content-Type": "application/json",
  Cookie:
    "_ga=GA1.1.436524445.1676272616; _ga_FYXJRGMP0X=GS1.1.1721785633.54.1.1721785740.0.0.0; sb-glxsavfzmcghogkuwrsf-auth-token-code-verifier=base64-IjJhODhkYTEwYjcyNGQ1OTI1ODNmOTFjYTdhMjM3NWIxYzBkNDA4OGUwMzYxZDZmMjMyMGJjNTMyZTA4OWNhYTk4NWRjNmUwNjNlMTNmNTlkNTM3NzA2N2UyZmE4ODc5YjEzYzZhYmZjNGVlZTRlYjUi; sb-glxsavfzmcghogkuwrsf-auth-token=base64-eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0ltdHBaQ0k2SWxReE5VVjVhVTl2WVVKRVFqa3daVThpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBjM01pT2lKb2RIUndjem92TDJkc2VITmhkbVo2YldObmFHOW5hM1YzY25ObUxuTjFjR0ZpWVhObExtTnZMMkYxZEdndmRqRWlMQ0p6ZFdJaU9pSTNOemxqTkRrME55MDBNVFZoTFRRMFlqRXRPRGsyTWkxbFlUQXpOMll4WW1SbVlqZ2lMQ0poZFdRaU9pSmhkWFJvWlc1MGFXTmhkR1ZrSWl3aVpYaHdJam94TnpJME5UZzBNemc0TENKcFlYUWlPakUzTWpRMU9EQTNPRGdzSW1WdFlXbHNJam9pZEdWemRFQm5iV0ZwYkM1amIyMGlMQ0p3YUc5dVpTSTZJaUlzSW1Gd2NGOXRaWFJoWkdGMFlTSTZleUp3Y205MmFXUmxjaUk2SW1WdFlXbHNJaXdpY0hKdmRtbGtaWEp6SWpwYkltVnRZV2xzSWwxOUxDSjFjMlZ5WDIxbGRHRmtZWFJoSWpwN2ZTd2ljbTlzWlNJNkltRjFkR2hsYm5ScFkyRjBaV1FpTENKaFlXd2lPaUpoWVd3eElpd2lZVzF5SWpwYmV5SnRaWFJvYjJRaU9pSndZWE56ZDI5eVpDSXNJblJwYldWemRHRnRjQ0k2TVRjeU5EVTJNamsyTjMxZExDSnpaWE56YVc5dVgybGtJam9pWlRWbU16TmlPR0V0WldVeU55MDBNMlkzTFdJME0yRXRZbUl5WW1GbE5HUmhNR1k1SWl3aWFYTmZZVzV2Ym5sdGIzVnpJanBtWVd4elpYMC5fYW1fcFd2UjQxdlBZY24tZDJFTmd6Y3NxUEVSNlVqS2ZZN1RkSy1qVUFVIiwidG9rZW5fdHlwZSI6ImJlYXJlciIsImV4cGlyZXNfaW4iOjM2MDAsImV4cGlyZXNfYXQiOjE3MjQ1ODQzODgsInJlZnJlc2hfdG9rZW4iOiJ1bnlfMHZvN0VVTGhvM1kzb3NDNmR3IiwidXNlciI6eyJpZCI6Ijc3OWM0OTQ3LTQxNWEtNDRiMS04OTYyLWVhMDM3ZjFiZGZiOCIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJlbWFpbF9jb25maXJtZWRfYXQiOiIyMDI0LTA4LTIxVDA0OjIyOjU3LjU0MjA4NFoiLCJwaG9uZSI6IiIsImNvbmZpcm1lZF9hdCI6IjIwMjQtMDgtMjFUMDQ6MjI6NTcuNTQyMDg0WiIsImxhc3Rfc2lnbl9pbl9hdCI6IjIwMjQtMDgtMjVUMDU6MTY6MDcuNDUxNTYxWiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwiaWRlbnRpdGllcyI6W3siaWRlbnRpdHlfaWQiOiI2YjE1NWE5ZS02MGUwLTQ1NjQtOTAyMi03NzE5MGY0NTA3NjEiLCJpZCI6Ijc3OWM0OTQ3LTQxNWEtNDRiMS04OTYyLWVhMDM3ZjFiZGZiOCIsInVzZXJfaWQiOiI3NzljNDk0Ny00MTVhLTQ0YjEtODk2Mi1lYTAzN2YxYmRmYjgiLCJpZGVudGl0eV9kYXRhIjp7ImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiNzc5YzQ5NDctNDE1YS00NGIxLTg5NjItZWEwMzdmMWJkZmI4In0sInByb3ZpZGVyIjoiZW1haWwiLCJsYXN0X3NpZ25faW5fYXQiOiIyMDI0LTA4LTIxVDA0OjIyOjU3LjUzNzg1NloiLCJjcmVhdGVkX2F0IjoiMjAyNC0wOC0yMVQwNDoyMjo1Ny41Mzc5MTRaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDgtMjFUMDQ6MjI6NTcuNTM3OTE0WiIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20ifV0sImNyZWF0ZWRfYXQiOiIyMDI0LTA4LTIxVDA0OjIyOjU3LjUzMzI5MloiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wOC0yNVQxMDoxMzowOC43NTYwMzJaIiwiaXNfYW5vbnltb3VzIjpmYWxzZX19; next-auth.csrf-token=8bde7e00d6c9556e3d250ffe8da4e6bfebac563c8c64fc719ea5dc17998e672d%7Cf37f3c6f69155e56e575989c05e1f01f93ca17032d1392180a02a811817335e6; next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000; next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..ws7SU2KjXO6yLl3f.6haPJhNvCukoNfxTFSm3vDJqKvODz95rHwC8ukWKcTT5toQ5ffEDFDZWLA2-bSZ-bs8GMDnVlxaeTHT1o2E7mOWFsw0pPA1rj93tJYkcMbPlGlRI4kM0hAdiU1yAVaiCHBXFlwsEIOWMjC84WY5FNGQ4UpKqSB37bFmzyxy4FW1o0CS3JVpscrp6kDggCVhXBAcuuZcpzgtpBXSyOkhzJTWr54VVlqJmEGDBDlJ2qf5iNi0paAxBhPQf-Z3nWS-V7sCSg9BGXmCp1BDCe8JZrTjGiUIl-Me71YYwjjdO6UxMbbtZ8Wekg6fpTaWJO9w-LrjramgjPrBjirNEu1A_1FgidDWyfpZV9a7JcN-X1cZLbHIWcgR9HSIZgaoddPN5hMc6xr3XmxSVFBuGo3FfLbvp9n7JyFqjcjKTber2EmCQEyEw7mn514FL3sZiocc5VTII_l7xOMA.PdAKEtejbhPBP0YGFAzS4A; _ga_NX6WXBQ9NK=GS2.1.s1746486739$o294$g1$t1746486788$j0$l0$h0; __next_hmr_refresh_hash__=8f2eed5ea6b52313f8a404e2f3710f9e633457081244afec"
});

describe("未認証ユーザー", () => {
  test("編集ページにアクセスした場合、401エラーが返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/${reflection.reflectionCUID}/edit`
    );
    expect(response.status).toBe(401);
  });

  test("編集するリクエストが飛ばされた場合、401エラーが返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/${reflection.reflectionCUID}/edit`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestReflection)
      }
    );
    expect(response.status).toBe(401);
  });
});

describe("認証済みユーザー", () => {
  test("指定されたreflectionCUIDが自身の投稿でなく、編集ページにアクセスした場合、403エラーが返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/${yusei53Reflection.reflectionCUID}/edit`,
      {
        headers: createAuthHeaders()
      }
    );
    expect(response.status).toBe(403);
  });

  test("指定されたreflectionCUIDが存在せず、編集ページにアクセスした場合、404エラーが返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/not-exist-reflection-cuid/edit`,
      {
        headers: createAuthHeaders()
      }
    );
    expect(response.status).toBe(404);
  });

  test("指定されたreflectionCUIDが自身の投稿であり、編集ページにアクセスした場合、200が返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/${reflection.reflectionCUID}/edit`,
      {
        headers: createAuthHeaders()
      }
    );
    expect(response.status).toBe(200);
  });

  test("指定されたreflectionCUIDが自身の投稿でなく、編集するリクエストが飛ばされた場合、403エラーが返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/${yusei53Reflection.reflectionCUID}/edit`,
      {
        method: "PATCH",
        headers: createAuthHeaders(),
        body: JSON.stringify(requestReflection)
      }
    );
    expect(response.status).toBe(403);
  });

  test("指定されたreflectionCUIDが存在せず、編集するリクエストが飛ばされた場合、404エラーが返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/not-exist-reflection-cuid/edit`,
      {
        method: "PATCH",
        headers: createAuthHeaders(),
        body: JSON.stringify(requestReflection)
      }
    );
    expect(response.status).toBe(404);
  });

  test("指定されたreflectionCUIDが自身の投稿であり、編集するリクエストが飛ばされた場合、200が返される", async () => {
    const response = await fetch(
      `${BASE_URL}/api/reflection/detail/${reflection.reflectionCUID}/edit`,
      {
        method: "PATCH",
        headers: createAuthHeaders(),
        body: JSON.stringify(requestReflection)
      }
    );
    expect(response.status).toBe(200);
  });
});

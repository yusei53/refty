import path from "path";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",

    trace: "on-first-retry"
  },

  projects: [
    {
      name: "chromium",
      testDir: "./e2e/tests/api",
      use: { ...devices["Desktop Chrome"] }
    },
    {
      name: "chromium",
      testDir: "./e2e/tests/ui",
      use: { ...devices["Desktop Chrome"] }
    },

    {
      name: "Mobile Chrome",
      testDir: "./e2e/tests/api",
      use: { ...devices["Pixel 5"] }
    },

    {
      name: "Mobile Chrome",
      testDir: "./e2e/tests/ui",
      use: { ...devices["iPhone 13 Pro"] }
    },

    {
      name: "Google Chrome",
      testDir: "./e2e/tests/api",
      use: { ...devices["Desktop Chrome"], channel: "chrome" }
    },
    {
      name: "Google Chrome",
      testDir: "./e2e/tests/ui",
      use: { ...devices["Desktop Chrome"], channel: "chrome" }
    }
  ],

  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI
  }
});

import { CssBaseline, ThemeProvider } from "@mui/material";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { NextAuthProvider } from "../providers";
import { Snowfall } from "../utils/snow-fall";
import { theme } from "../utils/theme/theme";

const GA_TAG_ID = process.env.NEXT_PUBLIC_GA_ID as string;

const siteName = "リフティ | 振り返りプラットフォーム";
const description = "日々の振り返りを手助けする振り返りプラットフォーム";
export const metadata: Metadata = {
  title: {
    default: siteName,
    template: "%s | リフティ"
  },
  description: description,
  openGraph: {
    type: "website",
    url: "https://www.refty.jp/",
    title: siteName,
    description: description,
    siteName: "リフティ"
  },
  twitter: {
    title: siteName,
    description: description,
    card: "summary"
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="リフティ" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body style={{ margin: 0 }}>
        <NextAuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Snowfall />
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
      <GoogleAnalytics gaId={GA_TAG_ID} />
    </html>
  );
}

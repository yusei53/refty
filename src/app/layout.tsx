import { GoogleAnalytics } from "@next/third-parties/google";
import { getServerSession } from "next-auth/next";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Snowfall } from "../components/snow-fall";
import { NextAuthProvider } from "../providers";
import { theme } from "../utils/theme/theme";
import authOptions from "./api/auth/[...nextauth]/options";

const GA_TAG_ID = process.env.NEXT_PUBLIC_GA_ID as string;

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
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
        <NextAuthProvider session={session}>
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

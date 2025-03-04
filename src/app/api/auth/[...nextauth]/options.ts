import { PrismaAdapter } from "@next-auth/prisma-adapter";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";
import TwitterProvider from "next-auth/providers/twitter";
import type { NextAuthOptions } from "next-auth";
import prisma from "@/src/lib/prisma";
import { mockAuthJwt } from "@/src/mocks/mockAuthJwt";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    DiscordProvider({
      clientId: process.env.AUTH_DISCORD_ID as string,
      clientSecret: process.env.AUTH_DISCORD_SECRET as string
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0"
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ],

  session: {
    strategy: "jwt"
  },
  ...(process.env.NEXT_PUBLIC_APP_ENV === "playwright" && {
    jwt: mockAuthJwt
  }),
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      if (trigger === "update" && session?.user?.username) {
        token.username = session.user.username;
      }
      return token;
    },
    async session({ session, token, trigger, newSession }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      if (trigger === "update" && newSession?.user?.username) {
        session.user.username = newSession.user.username as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;

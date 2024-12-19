import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import LineProvider from "next-auth/providers/line";
import TwitterProvider from "next-auth/providers/twitter";
import prisma from "@/src/lib/prisma";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.AUTH_DISCORD_ID as string,
      clientSecret: process.env.AUTH_DISCORD_SECRET as string,
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;

// MEMO: メールアドレス認証もし使う時はこれ
// CredentialsProvider({
//   name: "credentials",
//   credentials: {
//     // メールアドレスとパスワード
//     email: { label: "email", type: "text" },
//     password: { label: "password", type: "password" },
//   },

//   async authorize(credentials) {
//     //メールアドレスとパスワードがない場合のエラー
//     if (!credentials?.email || !credentials?.password) {
//       throw new Error("メールアドレスとパスワードが存在しません");
//     }
//     const user = await prisma.user.findUnique({
//       where: {
//         email: credentials.email,
//       },
//     });

//     //ユーザーが存在しないエラー
//     if (!user || !user?.hashedPassword) {
//       throw new Error("ユーザーが存在しません");
//     }

//     //パスワードが一致しない時のエラー
//     const isCorrectPassword = await bcrypt.compare(
//       credentials.password,
//       user.hashedPassword
//     );

//     if (!isCorrectPassword) {
//       throw new Error("パスワードが一致しません");
//     }

//     return user;
//   },
// }),

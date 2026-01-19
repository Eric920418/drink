import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "用戶名", type: "text" },
        password: { label: "密碼", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("請輸入用戶名和密碼");
        }

        // 先檢查資料庫中是否有管理員帳號
        let admin = await prisma.admin.findUnique({
          where: { username: credentials.username },
        });

        // 如果資料庫中沒有管理員，且使用環境變數中的帳密，則創建一個
        if (!admin) {
          const envUsername = process.env.ADMIN_USERNAME || "admin";
          const envPassword = process.env.ADMIN_PASSWORD || "admin123";

          if (
            credentials.username === envUsername &&
            credentials.password === envPassword
          ) {
            // 使用 bcrypt 雜湊密碼並創建管理員
            const { hash } = await import("bcryptjs");
            const hashedPassword = await hash(envPassword, 12);

            admin = await prisma.admin.create({
              data: {
                username: envUsername,
                password: hashedPassword,
                name: "管理員",
              },
            });
          } else {
            throw new Error("用戶名或密碼錯誤");
          }
        } else {
          // 驗證密碼
          const isValid = await compare(credentials.password, admin.password);
          if (!isValid) {
            throw new Error("用戶名或密碼錯誤");
          }
        }

        return {
          id: admin.id.toString(),
          name: admin.name || admin.username,
          email: admin.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 小時
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

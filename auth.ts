import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { adapter } from "next/dist/server/web/adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt";
import type { NextAuthOptions } from "next-auth";

export const config = {
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/signin",
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "Enter your email address",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "Enter your password",
        },
      },
      //this function is called when the user submits the form
      // it receives the credentials object and returns a user object if the credentials are valid
      async authorize(credentials) {
        if (!credentials) return null;
        // Find user by email and password in the database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        // تأكد إنك بتجيب قيمة الـ password
        const password = credentials.password; // ده الكائن
        if (user && user.password && password) {
          const isMatch = compareSync(password, user.password); // استخدم القيمة هنا
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  // callbacks are functions that are called at different stages of the authentication process
  // they can be used to customize the behavior of next-auth
  callbacks: {
    // Session callback is called whenever a session is created or updated
    async session({ session, user, trigger, token }: any) {
      //set the user id from the token to the session
      session.user.id = token.sub;

      // if there's an update, set the user name
      if (trigger === "update") {
        session.user.name = token.name;
      }
      return session;
    },
  },
} satisfies NextAuthOptions;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// this file is used to configure next-auth for authentication in the app

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const config = {
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/signin",
    verifyRequest: "/verify-request", // (used for check email message)
    newUser: "/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        console.log(user?.password);
        console.log(credentials.password);
        console.log(user);

        // Check if user exists and if the password matches
        if (user && user.password) {
          const isMatch = await compare(
            credentials.password as string,
            user.password
          );

          // If password is correct, return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        // If user does not exist or password does not match return null
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
};

// NextAuth is a function that takes the config object and returns an object with methods for handling authentication
const nextAuth = NextAuth(config);
export const { handlers, auth, signIn, signOut } = nextAuth;

// export const auth = nextAuth.auth;
// export const handlers = nextAuth.handlers;
// export const signIn = nextAuth.signIn;
// export const signOut = nextAuth.signOut;
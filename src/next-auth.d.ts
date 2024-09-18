import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    } & DefaultSession["user"];
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    token: string; // Add this line
    refreshToken: string; // Add this line
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
  }
}

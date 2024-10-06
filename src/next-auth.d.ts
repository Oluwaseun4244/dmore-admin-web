import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string | null | unknown;
      country: string | unknown;
      state: string | unknown;
      city: string | unknown;
      firstName: string | unknown;
      lastName: string | unknown;
    } & DefaultSession["user"];
    accessToken: string;
    refreshToken: string;
    expiredAt: string | number | unknown;
    error: string | number | unknown;
    role: string | number | unknown;

  }

  interface User {
    id: string;
    email: string;
    name: string;
    token: string; // Add this line
    refreshToken: string; // Add this line
    role: string;
    country: string;
    state: string;
    city: string;
    firstName: string;
    lastName: string;
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

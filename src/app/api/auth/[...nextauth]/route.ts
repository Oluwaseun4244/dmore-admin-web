import NextAuth from "next-auth/next";
import { authOptions } from "../../../../../lib/authOptions";

import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

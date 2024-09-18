import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface DecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  fullName: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone": string;
  exp: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        try {
          const response = await fetch(
            "https://dmore-backend-dotnet.onrender.com/get-token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (response.status === 401) {
            throw new Error(data.exception || "Invalid credentials");
          }

          if (!response.ok) {
            throw new Error(data.exception || "Authentication failed");
          }

          if (data.token) {
            const decodedToken = jwtDecode<DecodedToken>(data.token);
            return {
              id: decodedToken[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
              ],
              email:
                decodedToken[
                  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
                ],
              name: decodedToken.fullName,
              token: data.token,
              refreshToken: data.refreshToken,
            };
          } else {
            throw new Error("Token not received");
          }
        } catch (error) {
          console.error("Authentication error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.token;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

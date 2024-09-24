import { decodeJwt } from "@/app/utils/apiUtils";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
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


let isRefreshing = false;
let refreshTokenPromise: Promise<JWT> | null = null;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  if (isRefreshing) {
    // If another refresh is in progress, wait for the current refresh to resolve
    return refreshTokenPromise as Promise<JWT>;
  }

  isRefreshing = true;

  refreshTokenPromise = (async (): Promise<JWT> => {
    try {
      const url = "https://dmore-backend-dotnet.onrender.com/refresh";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.accessToken}`,
        },
        body: JSON.stringify({
          token: token.accessToken,
          refreshToken: token.refreshToken,
        }),
      });

      const refreshedTokens = await response.json();
      if (!response.ok) {
        throw refreshedTokens;
      }

      return {
        ...token,
        accessToken: refreshedTokens.token,
        refreshToken: refreshedTokens.refreshToken,
        expiredAt: decodeJwt(refreshedTokens.token).exp.toStrin
        (),
      };

    } catch (error) {
      console.error("Error refreshing token:", error);
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    } finally {
      // Reset the flag and promise after the refresh completes
      isRefreshing = false;
      refreshTokenPromise = null;
    }
  })();

  // Await the refresh token promise
  return refreshTokenPromise;
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
        token.expiredAt = decodeJwt(user.token).exp.toString()
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (token.expiredAt) {
        const expirationTime = Number(token.expiredAt);
        // Check if the token is expiring in grater than 5 minutes (300 seconds)
        if (expirationTime - currentTime > 300) {
          return token
        }
      }
      return refreshAccessToken(token)

    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expiredAt = token.expiredAt;
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

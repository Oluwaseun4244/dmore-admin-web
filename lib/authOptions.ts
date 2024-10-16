import { decodeJwt } from "@/app/utils/apiUtils";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";


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
        expiredAt: decodeJwt(refreshedTokens.token).exp.toString(),
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
          // Fetch the token
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
          

            const profileResponse = await fetch(
              "https://dmore-backend-dotnet.onrender.com/profile",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
              }
            );

            const profileData = await profileResponse.json();
            const allowedRoles = ['Finance', 'Admin']


            if (!profileResponse.ok) {
              throw new Error(profileData.message || "Failed to fetch profile");
            }

            if (!allowedRoles.includes(profileData.role)) {
              throw new Error("You tried to access a page you do not have authorization to");
            }

            return {
              id: profileData.id,
              email: profileData.email,
              name: `${profileData.firstName} ${profileData.lastName}`,
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              role: profileData.role, // Ensure role is returned from profile
              token: data.token,
              refreshToken: data.refreshToken,
              country: profileData.country,
              state: profileData.state,
              city: profileData.city,
              isActive: profileData.isActive,
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
        token.country = user.country;
        token.state = user.state;
        token.city = user.city;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.expiredAt = decodeJwt(user.token).exp.toString();
        token.role = user.role;
        token.error = "";
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (token.expiredAt) {
        const expirationTime = Number(token.expiredAt);
        if (expirationTime - currentTime > 600) {
          //600 being 10 minutes
          // console.log("TIME", expirationTime - currentTime)
          return token;
        }
      }
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {

      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.country = token.country;
        session.user.state = token.state;
        session.user.city = token.city;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expiredAt = token.expiredAt;
        session.role = token.role;  
        session.error = token.error;
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


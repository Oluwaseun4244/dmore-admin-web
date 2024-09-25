"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Toaster } from 'react-hot-toast';
import SessionWrapper from "../../components/SessionWrapper";
import PrivateRoute from "./components/PrivateRoute";
import "./globals.css";
import ReactQueryProvider from "./utils/providers/ReactQueryProvider";

import StoreProvider from "@/lib/StoreProvider";
import { useSession } from "next-auth/react";
import Alert from "./components/Alert";

const inter = Inter({ subsets: ["latin"] });

const publicRoutes = ["/", "/login", "/signup", "/signup/buyer", "/signup/staff"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname() || "";
  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <StoreProvider>
      <SessionWrapper>
        <html lang='en'>
          <body className={`${inter.className} overflow-x-hidden`}>
            <ReactQueryProvider>
              <Toaster />
              {isPublicRoute ? (
                children
              ) : (
                <PrivateRoute>{children}</PrivateRoute>
              )}
            </ReactQueryProvider>
            <Alert />
          </body>
        </html>
      </SessionWrapper>
    </StoreProvider>
  );
}

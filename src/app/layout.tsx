"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { Toaster } from 'react-hot-toast';
import SessionWrapper from "../../components/SessionWrapper";
import PrivateRoute from "./components/PrivateRoute";
import "./globals.css";
import ReactQueryProvider from "./utils/providers/ReactQueryProvider";

import StoreProvider from "@/lib/StoreProvider";
import Alert from "./components/Alert";

const inter = Inter({ subsets: ["latin"] });

const publicRoutes = ["/", "/login", "/signup/buyer", "/signup/staff"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname() || "";
  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <html lang='en'>
      <body className={`${inter.className} overflow-x-hidden overflow-y-hidden h-full`}>
        <StoreProvider>
          <SessionWrapper>

            <ReactQueryProvider>
              <Toaster />
              {isPublicRoute ? (
                children
              ) : (
                <PrivateRoute>{children}</PrivateRoute>
              )}
            </ReactQueryProvider>
            <Alert />

          </SessionWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}

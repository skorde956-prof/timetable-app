import "./../styles/globals.css";
import type { Metadata } from "next";
import { ReactQueryProvider } from "@/components/providers/react-query";
import { AuthSessionProvider } from "@/components/providers/session";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "MindEase",
  description: "AI-first micro-therapy with community & group care",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthSessionProvider>
          <ReactQueryProvider>
            <Header />
            <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
          </ReactQueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}

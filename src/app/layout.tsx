import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Session } from "next-auth";
import { SessionProvider } from "@/components/session-provider";
import { SideBar } from "@/components/sidebar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Chat AI",
  description: "Your chat AI",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    session?: Session;
  };
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex",
          fontSans.variable
        )}
      >
        <SessionProvider session={params.session}>
          <SideBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

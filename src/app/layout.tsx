import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Session } from "next-auth";
import { SessionProvider } from "@/components/session-provider";

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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={params.session}>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

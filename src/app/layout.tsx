import type { Metadata } from "next";
import "./globals.css";
import { QueryClientProvider } from "@/components/providers/query-client-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HeaderProvider } from "@/components/ui/header-provider";

export const metadata: Metadata = {
  title: "MiddayHub - Smart Midday Meal Monitoring",
  description: "Smart Midday Meal Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <QueryClientProvider>
            {/* <HeaderProvider /> */}
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const noto_sans = Noto_Sans({ subsets: ["latin"] });

import { Toaster } from "react-hot-toast";

import { Providers } from "../../QueryClientProvider";
import { ChatProvider } from "@/context/ChatContext";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Quicky | Connect yourself",
  description: "A text messaging app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Providers>
        <ChatProvider>
          <body className={noto_sans.className}>
            <NextThemesProvider attribute="class" defaultTheme="light">
              {children}
              <Toaster />
            </NextThemesProvider>
          </body>
        </ChatProvider>
      </Providers>
    </html>
  );
}

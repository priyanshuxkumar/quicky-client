import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { Toaster } from 'react-hot-toast';

import { Providers } from "../../QueryClientProvider";

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
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}
          <Toaster/>
        </body>
      </Providers>
    </html>
  );
}

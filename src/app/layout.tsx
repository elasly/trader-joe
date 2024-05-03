import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "My App",
  description: "Thank You T3",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="Dark"
            enableSystem
            disableTransitionOnChange
          >
        <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

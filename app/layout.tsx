import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health Check",
  description:
    "Talk to an AI assistant who can help give you comfort and provide advice on how to help you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta property="og:title" content="Health Check" />
      <meta
        property="og:description"
        content="Talk to an AI assistant who can help give you comfort and provide advice on how to help you."
      />
      <meta property="og:image" content="/healthCheck.jpg" />

      <body className={inter.className}>
        <Theme
          appearance="dark"
          accentColor="blue"
          grayColor="gray"
          radius="large"
          scaling="95%"
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}

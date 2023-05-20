import { ChildrenProps } from "@/types/global.types";
import { Inter } from "next/font/google";
import "tailwindcss/tailwind.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Feeds App",
  description: "Apps for users to add and read posts from other users",
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Providers } from "@/providers";
import "@/index.css";

export const metadata: Metadata = {
  title: "Skill Mission India - Empowering Through Education",
  description: "Learn and develop skills with India's leading education platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

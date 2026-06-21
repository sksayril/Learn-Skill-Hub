import type { Metadata } from "next";
import { Providers } from "@/providers";
import "@/index.css";

export const metadata: Metadata = {
  title: "Support Mission India - Empowering Through Education",
  description: "Government-approved and CSR-backed skill development initiatives. Connect with free computer training, vocational certifications, and placement opportunities.",
  keywords: ["Support Mission India", "Skill Development", "Govt Programs", "CSR Training", "Vocational Training", "Free Education", "Computer Classes", "Job Placement"],
  authors: [{ name: "Support Mission India" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Support Mission India - Empowering Through Education",
    description: "Government-approved and CSR-backed skill development initiatives. Connect with free computer training, vocational certifications, and placement opportunities.",
    url: "https://supportmissionindia.org",
    siteName: "Support Mission India",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Support Mission India Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Mission India - Empowering Through Education",
    description: "Government-approved and CSR-backed skill development initiatives. Connect with free computer training, vocational certifications, and placement opportunities.",
    images: ["/opengraph.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-orange-surface text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

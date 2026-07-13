import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Portfolio Akmal",
  description:
    "Personal portfolio of Muhammad Akmal Firmansyah. Computer Science student, Full Stack Web Developer, and Machine Learning Enthusiast building modern web applications.",
  keywords: [
    "Muhammad Akmal Firmansyah",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Machine Learning",
    "Indonesia",
  ],
  authors: [{ name: "Muhammad Akmal Firmansyah" }],
  openGraph: {
    title: "Portfolio Akmal",
    description:
      "Computer Science student and Full Stack Web Developer building modern web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${plusJakartaSans.variable}`}
    >
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

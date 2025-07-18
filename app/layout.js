import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
    title: "Danyal Imtiaz - Software Engineer | Java Backend Developer Tulsa",
    description: "Software Engineer with 4+ years building distributed systems & APIs. Java, Spring Boot, React expert. Available for backend engineering roles in Tulsa, OK.",
    keywords: "Software Engineer Tulsa, Java Developer, Backend Engineer, Spring Boot, React Developer, API Development, Microservices, Distributed Systems, Oklahoma Software Engineer",
    authors: [{ name: "Danyal Imtiaz" }],
    creator: "Danyal Imtiaz",

    // Social Media Cards (Beautiful previews when shared!)
    openGraph: {
        title: "Danyal Imtiaz - Software Engineer | 4+ Years Experience",
        description: "Backend Engineer specializing in Java, Spring Boot & distributed systems. Built systems handling 50K+ daily transactions.",
        url: "https://danyalimtiaz.com",
        siteName: "Danyal Imtiaz Portfolio",
        type: "website",
        locale: "en_US",
    },

    // Twitter/X Cards
    twitter: {
        card: "summary_large_image",
        title: "Danyal Imtiaz - Software Engineer",
        description: "Backend Engineer | Java, Spring Boot, React | 4+ years building enterprise systems",
        creator: "@DanyalImtiaz1",
    },

    // Tell Google to index everything!
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

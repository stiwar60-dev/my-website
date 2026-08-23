import "./curiosity/curiosity.css";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Caveat,
  Courier_Prime,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://polarnexus.live"),

  title: {
    default: "NEXUS — Science, Poetry & Curiosity",
    template: "%s | NEXUS",
  },

  description:
    "An exploration of science, poetry, curiosity, and the questions that connect them.",

  applicationName: "NEXUS",

  authors: [
    {
      name: "Sanidhya Tiwari",
    },
  ],

  creator: "Sanidhya Tiwari",

  openGraph: {
    type: "website",
    url: "https://polarnexus.live",
    siteName: "NEXUS",

    title: "NEXUS — Science, Poetry & Curiosity",

    description:
      "An exploration of science, poetry, curiosity, and the questions that connect them.",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "NEXUS — Science, Poetry & Curiosity",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "NEXUS — Science, Poetry & Curiosity",

    description:
      "An exploration of science, poetry, curiosity, and the questions that connect them.",

    images: ["/opengraph-image.png"],
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        className={`${caveat.variable} ${courierPrime.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
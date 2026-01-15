import "./globals.css";
import { Providers } from "./providers";
import localFont from "next/font/local";

const aeonic = localFont({
  src: [
    {
      path: "./fonts/Aeonik/Aeonik-Thin.woff",
      weight: "100",
    },
    {
      path: "./fonts/Aeonik/Aeonik-Air.woff",
      weight: "200",
    },
    {
      path: "./fonts/Aeonik/Aeonik-Light.woff",
      weight: "300",
    },

    {
      path: "./fonts/Aeonik/Aeonik-Regular.woff",
      weight: "400",
    },
    {
      path: "./fonts/Aeonik/Aeonik-Medium.woff",
      weight: "500",
    },
    {
      path: "./fonts/Aeonik/Aeonik-Bold.woff",
      weight: "700",
    },
    {
      path: "./fonts/Aeonik/Aeonik-Black.woff",
      weight: "900",
    },
  ],
  variable: "--font-aeonik",
  weight: "100 900",
});

export const metadata = {
  title: "IfinOcean",
  description:
    "Skip the complex trading charts and let our expert-managed packages deliver consistent returns on your cryptocurrency investments.",
  applicationName: "IfinOcean",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Crypto",
    "Investment",
    //Add more
  ],
  authors: [{ name: "DevGradea" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: {
      url: "/Images/b.JPG",
      type: "image/svg+xml",
    },
    shortcut: {
      url: "/Images/b.JPG",
      type: "image/svg+xml",
    },
    apple: {
      url: "/Images/b.JPG",
      type: "image/svg+xml",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${aeonic.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

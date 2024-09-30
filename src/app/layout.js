import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Banana 🍌",
  description: "Imagine living in a world where bananas control humans.",
  openGraph: {
    title: "Banana 🍌",
    description: "Imagine living in a world where bananas control humans.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Banana 🍌",
    description: "Imagine living in a world where bananas control humans.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

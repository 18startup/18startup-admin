import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

// Toaster
import { Toaster } from "react-hot-toast";

// Nextjs Toploader
import NextTopLoader from 'nextjs-toploader';

const poppins = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600'] });

export const metadata: Metadata = {
  title: "Admin Dashboard | 18startup",
  description: "Official Admin dashboard of 18startup.",
  keywords: ['18startup admin', 'admin 18startup', '18startup', '18 startups']
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextTopLoader color="#F37335" showSpinner={false} crawl={true} easing="ease-in" crawlSpeed={180} height={5} />
        <Toaster containerStyle={{ zIndex: 1001, fontSize: '0.8rem' }} gutter={5} />
        {children}
      </body>
    </html>
  );
}

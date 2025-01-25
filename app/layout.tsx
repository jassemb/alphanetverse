"use client"; 
import './globals.css';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/Footer';
import { usePathname } from 'next/navigation';
import { SessionProvider } from "next-auth/react";  // Import SessionProvider

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current path
  const excludedPaths = ['/Mainpage', '/Dashboard', '/Tree']; // Paths to exclude the Navbar and Footer

  return (
    <html lang="en">
      <body>
        <SessionProvider>  {/* Wrap your app with SessionProvider */}
          {!excludedPaths.includes(pathname) && <Navbar />}
          {children}
          {!excludedPaths.includes(pathname) && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}

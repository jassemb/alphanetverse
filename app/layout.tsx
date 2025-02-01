"use client"; 
import './globals.css';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/Footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname(); // Get the current path
  const excludedPaths = ['/Mainpage','/Dashbord','/Tree','/Courses']; // Paths to exclude the Navbar and Footer
  return (
    <html lang="en">
      <body>
      {!excludedPaths.includes(pathname) && <Navbar />}
        {children}
        {!excludedPaths.includes(pathname) && <Footer />}
      </body>
    </html>
  )
}

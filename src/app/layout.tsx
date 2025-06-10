import type { Metadata } from 'next';
import Link from 'next/link'; // Import Link
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import { AuthProvider } from '@/context/AuthContext'; // Import AuthProvider

export const metadata: Metadata = {
  title: 'Cuisine Compass',
  description: 'Generate recipes for any cuisine in the world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <AuthProvider> {/* Wrap with AuthProvider */}
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster />
        </AuthProvider> {/* Close AuthProvider */}
      </body>
    </html>
  );
}

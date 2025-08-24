import type { Metadata } from 'next';
import Link from 'next/link'; 
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Cuisine Compass - Your AI Recipe Generator',
  description: 'Discover and generate unique recipes from any cuisine in the world with AI. Your ultimate cooking companion.',
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
      <body className="font-body antialiased min-h-screen flex flex-col bg-background">
        <AuthProvider>
          <Header />
          <main className="flex-grow"> {/* Removed container, px, py for full-width landing page sections */}
            {children}
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

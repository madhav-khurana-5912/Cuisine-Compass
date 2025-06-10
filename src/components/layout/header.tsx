// src/components/layout/header.tsx
"use client"; 

import Link from 'next/link';
import { ChefHat, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <ChefHat size={32} className="group-hover:animate-pulse"/>
          <h1 className="text-2xl font-headline font-bold text-black dark:text-white">Cuisine Compass</h1>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
            <Link href="/favorites" className="flex items-center gap-1">
              <Star size={20} />
              Favorites
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

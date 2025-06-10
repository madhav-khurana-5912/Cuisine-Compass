import Link from 'next/link';
import { ChefHat, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <ChefHat size={32} />
          <h1 className="text-2xl font-headline font-bold">Cuisine Compass</h1>
        </Link>
        <nav>
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

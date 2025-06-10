// src/components/layout/header.tsx
"use client"; 

import Link from 'next/link';
import { ChefHat, Star, LogIn, UserPlus, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext'; 
import { auth } from '@/lib/firebaseConfig'; 
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/'); 
    } catch (error) {
      console.error("Error signing out: ", error);
      // Optionally, show a toast notification for sign-out error
      // Example: toast({ title: "Sign Out Error", description: "Could not sign out. Please try again."})
    }
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <ChefHat size={32} className="group-hover:animate-pulse"/>
          <h1 className="text-2xl font-headline font-bold">Cuisine Compass</h1>
        </Link>
        <nav className="flex items-center gap-2">
          {loading ? (
             <Button variant="ghost" size="icon" disabled className="text-primary-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
             </Button>
          ) : user ? (
            <>
              <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                <Link href="/favorites" className="flex items-center gap-1">
                  <Star size={20} />
                  Favorites
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleSignOut} 
                className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
              >
                <LogOut size={20} className="mr-1" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                <Link href="/signin" className="flex items-center gap-1">
                  <LogIn size={20} />
                  Sign In
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/signup" className="flex items-center gap-1">
                  <UserPlus size={20} />
                   Sign Up
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

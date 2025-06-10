
// src/components/layout/header.tsx
"use client"; 

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChefHat, Star, LogIn, UserPlus, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // This handleSignOut function is kept here in case we want a quick logout from header in future
  // but the primary logout button is now on the profile page.
  const handleQuickSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      router.push('/');
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error Signing Out",
        description: "Could not sign you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <ChefHat size={32} className="group-hover:animate-pulse"/>
          <h1 className="text-2xl font-headline font-bold text-black dark:text-white">Cuisine Compass</h1>
        </Link>
        <nav className="flex items-center gap-2">
          {!loading && user ? (
            <>
              <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                <Link href="/favorites" className="flex items-center gap-1">
                  <Star size={20} />
                  Favorites
                </Link>
              </Button>
              <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                <Link href="/profile" className="flex items-center gap-1">
                  <UserCircle size={20} />
                  Profile
                </Link>
              </Button>
              {/* The Log Out button below is removed as per request to have it in profile page. 
                  Kept handleQuickSignOut function if a quick header logout is desired later.
              <Button variant="ghost" onClick={handleQuickSignOut} className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                <LogOut size={20} />
                Sign Out
              </Button>
              */}
            </>
          ) : !loading && !user ? (
            <>
              <Button variant="ghost" asChild className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                <Link href="/signin" className="flex items-center gap-1">
                  <LogIn size={20} />
                  Sign In
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-primary-foreground/50 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                <Link href="/signup" className="flex items-center gap-1">
                  <UserPlus size={20} />
                   Sign Up
                </Link>
              </Button>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

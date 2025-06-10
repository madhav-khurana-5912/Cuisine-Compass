
// src/app/profile/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebaseConfig';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { UserCircle, LogOut, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin?redirect=/profile');
    }
  }, [user, authLoading, router]);

  const handleSignOut = async () => {
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

  if (authLoading || !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading profile...</p>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <UserCircle className="h-16 w-16 mx-auto text-primary mb-2" />
          <CardTitle className="font-headline text-3xl text-primary">Your Profile</CardTitle>
          <CardDescription>Manage your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">{user.email || "No email provided"}</p>
            </div>
          </div>
           {/* You can add more user details here if available and needed */}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            variant="destructive" 
            onClick={handleSignOut} 
            className="w-full"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log Out
          </Button>
          <p className="text-sm text-muted-foreground">
            Want to explore recipes?{' '}
            <Button variant="link" asChild className="p-0 h-auto text-primary">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

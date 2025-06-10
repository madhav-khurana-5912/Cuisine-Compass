// src/app/signin/page.tsx
"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, LogIn } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(redirectPath); 
    } catch (err: any) {
      let friendlyMessage = 'Failed to sign in. Please check your credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        friendlyMessage = 'Invalid email or password. Please try again.';
      } else if (err.code === 'auth/too-many-requests') {
        friendlyMessage = 'Too many failed login attempts. Please try again later or reset your password.';
      }
      setError(friendlyMessage);
      console.error("Firebase SignIn Error:", err.code, err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">Sign In</CardTitle>
          <CardDescription>Access your account to continue.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignIn}>
          <CardContent className="space-y-6 px-6 py-8">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Sign In Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="bg-background border-input focus:ring-accent"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-background border-input focus:ring-accent"
                autoComplete="current-password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 px-6 pb-8">
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3" disabled={isLoading}>
              {isLoading ? (
                <span className="animate-pulse">Signing In...</span>
              ) : (
                <><LogIn className="mr-2 h-5 w-5" /> Sign In</>
              )}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

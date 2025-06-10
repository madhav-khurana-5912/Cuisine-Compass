// src/app/signup/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, UserPlus } from 'lucide-react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/'); // Redirect to home page after successful sign-up
    } catch (err: any) {
      let friendlyMessage = 'Failed to sign up. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        friendlyMessage = 'This email address is already in use. Try signing in or use a different email.';
      } else if (err.code === 'auth/invalid-email') {
        friendlyMessage = 'The email address is not valid. Please enter a correct email format.';
      } else if (err.code === 'auth/weak-password') {
        friendlyMessage = 'The password is too weak. Please choose a stronger password (at least 6 characters).';
      }
      setError(friendlyMessage);
      console.error("Firebase SignUp Error:", err.code, err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">Create Account</CardTitle>
          <CardDescription>Join Cuisine Compass to save your favorite recipes.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardContent className="space-y-6 px-6 py-8">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Sign Up Failed</AlertTitle>
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
                placeholder="Choose a strong password (min. 6 characters)"
                required
                minLength={6}
                className="bg-background border-input focus:ring-accent"
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
                className="bg-background border-input focus:ring-accent"
                autoComplete="new-password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 px-6 pb-8">
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3" disabled={isLoading}>
              {isLoading ? (
                 <span className="animate-pulse">Creating Account...</span>
              ) : (
                <><UserPlus className="mr-2 h-5 w-5" /> Sign Up</>
              )}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/signin" className="font-semibold text-primary hover:underline">
                Sign In here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

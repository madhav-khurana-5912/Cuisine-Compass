
// src/app/forgot-password/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2, MailCheck, KeyRound } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handlePasswordReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    setIsEmailSent(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setIsEmailSent(true);
      toast({
        title: "Password Reset Email Sent",
        description: "If an account exists for this email, a password reset link has been sent.",
      });
      // Optionally redirect or clear form after a delay
      // setTimeout(() => router.push('/signin'), 5000);
    } catch (err: any) {
      let friendlyMessage = "Failed to send password reset email. Please try again.";
      if (err.code === 'auth/invalid-email') {
        friendlyMessage = "The email address is not valid.";
      } else if (err.code === 'auth/user-not-found') {
        // We don't want to reveal if an email exists or not for security reasons
        // So we show a generic success message even in this case
        setIsEmailSent(true); 
        toast({
            title: "Password Reset Email Sent",
            description: "If an account exists for this email, a password reset link has been sent.",
        });
      } else {
        console.error("Firebase Password Reset Error:", err.code, err.message);
      }
      setError(friendlyMessage); // Still set error for internal tracking or more specific UI if needed
                                 // but public message is generic for user-not-found
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl text-primary flex items-center justify-center gap-2">
            <KeyRound className="h-8 w-8" />
            Forgot Password?
          </CardTitle>
          <CardDescription>Enter your email address and we'll send you a link to reset your password.</CardDescription>
        </CardHeader>
        <form onSubmit={handlePasswordReset}>
          <CardContent className="space-y-6">
            {error && !isEmailSent && ( // Only show error if email wasn't "sent" (even if user not found)
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {isEmailSent && (
              <Alert variant="default" className="bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300">
                <MailCheck className="h-4 w-4 !text-green-600 dark:!text-green-400" />
                <AlertTitle>Check Your Email</AlertTitle>
                <AlertDescription>
                  If an account with that email exists, a password reset link has been sent. Please check your inbox (and spam folder).
                </AlertDescription>
              </Alert>
            )}
            {!isEmailSent && (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="bg-background border-input focus:ring-accent"
                  disabled={isLoading}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {!isEmailSent && (
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading || !email}>
                {isLoading ? <Loader2 className="animate-spin" /> : <MailCheck />}
                Send Reset Email
              </Button>
            )}
            <p className="text-sm text-muted-foreground">
              Remembered your password?{' '}
              <Button variant="link" asChild className="p-0 h-auto text-primary">
                <Link href="/signin">Sign In</Link>
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

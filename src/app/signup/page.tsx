// src/app/signup/page.tsx
"use client";

import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex flex-col justify-center items-center py-12 text-center">
      <h1 className="text-2xl font-headline font-semibold mb-4">Sign Up Removed</h1>
      <p className="text-muted-foreground mb-6">
        User registration has been removed from this application.
      </p>
      <Link href="/" className="text-primary hover:underline">
        Go to Homepage
      </Link>
    </div>
  );
}

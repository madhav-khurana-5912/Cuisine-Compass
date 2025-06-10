
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChefHat, Globe, Heart, Lightbulb, Search, Sparkles, Rocket, BookOpenText } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/20 via-background to-background text-center">
          <div className="container mx-auto px-4">
            <Sparkles className="h-16 w-16 text-accent mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-6">
              Discover Your Next Culinary Adventure
            </h1>
            <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-10">
              Cuisine Compass helps you explore global flavors by generating unique recipes tailored to your tastes.
              Enter a cuisine, add your preferences, and let our AI chef inspire you!
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform">
                <Link href="/signup">
                  <Rocket className="mr-2" /> Get Started
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-lg transform hover:scale-105 transition-transform">
                <Link href="#features">
                  Learn More
                </Link>
              </Button>
            </div>
             {/* <div className="mt-16">
              <Image
                src="https://placehold.co/800x400"
                alt="Delicious food collage"
                width={800}
                height={400}
                className="rounded-xl shadow-2xl mx-auto"
                data-ai-hint="food collage"
              />
            </div> */}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center text-primary mb-16">
              Why You'll Love Cuisine Compass
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                    <Globe className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl text-foreground">Explore Global Cuisines</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  From Italian pasta to spicy Thai curry, discover recipes from around the world. Just name a cuisine!
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                    <Lightbulb className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl text-foreground">AI-Powered Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Our smart AI generates creative and delicious recipes, complete with ingredients and instructions.
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                    <Heart className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl text-foreground">Save Your Favorites</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Keep track of all the recipes you love and revisit them anytime. (Sign-in required for cloud saving)
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center text-primary mb-16">
              Get Cooking in 3 Simple Steps
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center p-6 rounded-xl">
                <div className="p-4 bg-primary text-primary-foreground rounded-full inline-block mb-4 ring-4 ring-primary/30">
                  <Search className="h-10 w-10" />
                </div>
                <h3 className="font-headline text-xl font-semibold text-foreground mb-2">1. Specify Cuisine</h3>
                <p className="text-muted-foreground">
                  Tell us what type of food you're in the mood for (e.g., "Mexican", "Japanese").
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-xl">
                <div className="p-4 bg-primary text-primary-foreground rounded-full inline-block mb-4 ring-4 ring-primary/30">
                  <ChefHat className="h-10 w-10" />
                </div>
                <h3 className="font-headline text-xl font-semibold text-foreground mb-2">2. Get Recipe</h3>
                <p className="text-muted-foreground">
                  Our AI generates a unique recipe, including ingredients, utensils, and instructions.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-xl">
                <div className="p-4 bg-primary text-primary-foreground rounded-full inline-block mb-4 ring-4 ring-primary/30">
                  <BookOpenText className="h-10 w-10" />
                </div>
                <h3 className="font-headline text-xl font-semibold text-foreground mb-2">3. Cook & Enjoy!</h3>
                <p className="text-muted-foreground">
                  Follow the steps and enjoy your delicious, home-cooked meal. Save it if you love it!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32 bg-background text-center">
          <div className="container mx-auto px-4">
            <ChefHat className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">
              Ready to Start Your Flavor Journey?
            </h2>
            <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-10">
              Don't wait any longer. Dive into a world of culinary possibilities with Cuisine Compass.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-transform">
              <Link href="/generate">
                <Sparkles className="mr-2" /> Generate Your First Recipe
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

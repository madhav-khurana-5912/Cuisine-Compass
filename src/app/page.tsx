"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import RecipeCard from '@/components/recipe-card';
import type { Recipe } from '@/lib/types';
import { generateRecipeAction } from '@/lib/actions';
import { Sparkles, AlertCircle, Loader2 } from 'lucide-react';

export default function HomePage() {
  const [cuisine, setCuisine] = useState('');
  const [additionalConsiderations, setAdditionalConsiderations] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cuisine.trim()) {
      setError("Please enter a cuisine type.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedRecipe(null);

    const result = await generateRecipeAction(cuisine, additionalConsiderations);

    setIsLoading(false);
    if (result.recipe) {
      setGeneratedRecipe(result.recipe);
    } else if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-center text-primary">Find Your Next Favorite Recipe</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="cuisine" className="block text-sm font-medium text-foreground mb-1">
                Cuisine Type
              </label>
              <Input
                id="cuisine"
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="e.g., Italian, Indian, Mexican"
                className="bg-background border-input focus:ring-accent"
                required
              />
            </div>
            <div>
              <label htmlFor="additionalConsiderations" className="block text-sm font-medium text-foreground mb-1">
                Additional Preferences (Optional)
              </label>
              <Textarea
                id="additionalConsiderations"
                value={additionalConsiderations}
                onChange={(e) => setAdditionalConsiderations(e.target.value)}
                placeholder="e.g., vegetarian, gluten-free, spicy, quick meal"
                className="bg-background border-input focus:ring-accent"
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-5 w-5" />
              )}
              Generate Recipe
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <Alert variant="destructive" className="max-w-2xl mx-auto shadow-md rounded-lg">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {generatedRecipe && (
        <div className="mt-12 max-w-2xl mx-auto">
           <h2 className="text-2xl font-headline font-semibold mb-4 text-center">Generated Recipe</h2>
          <RecipeCard recipe={generatedRecipe} />
        </div>
      )}
    </div>
  );
}

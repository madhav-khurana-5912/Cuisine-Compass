"use client";

import type { Recipe } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, List } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

export default function RecipeCard({ recipe, className }: RecipeCardProps) {
  const { addFavorite, removeFavorite, isFavorite, isLoaded } = useFavorites();

  const handleToggleFavorite = () => {
    if (!isLoaded) return;
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  // Process instructions string into an array of steps
  const instructionSteps = recipe.instructions.split('\n').filter(step => step.trim() !== '');

  return (
    <Card className={cn("w-full shadow-lg rounded-lg overflow-hidden", className)}>
      <CardHeader className="bg-secondary">
        <CardTitle className="font-headline text-2xl text-secondary-foreground">{recipe.recipeName}</CardTitle>
        <p className="text-sm text-muted-foreground">{recipe.cuisine}</p>
      </CardHeader>
      <CardContent className="py-6">
        <div className="mb-6">
          <h3 className="font-headline text-xl font-semibold mb-2 flex items-center">
            <List className="mr-2 h-5 w-5 text-primary" />
            Ingredients
          </h3>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-headline text-xl font-semibold mb-2">Instructions</h3>
          <div className="space-y-2 text-foreground">
            {instructionSteps.map((step, index) => (
              <p key={index} className="leading-relaxed">
                <span className="font-semibold">{index + 1}. </span>{step}
              </p>
            ))}
          </div>
        </div>
        {recipe.additionalConsiderations && (
           <div className="mt-6">
            <h3 className="font-headline text-lg font-semibold mb-1">Additional Considerations:</h3>
            <p className="text-sm text-muted-foreground">{recipe.additionalConsiderations}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          size="lg"
          onClick={handleToggleFavorite}
          className={cn(
            "w-full text-accent-foreground hover:bg-accent/10",
            isFavorite(recipe.id) ? "bg-accent text-accent-foreground hover:bg-accent/80" : "text-accent"
          )}
          disabled={!isLoaded}
          aria-label={isFavorite(recipe.id) ? "Remove from favorites" : "Add to favorites"}
        >
          <Star className={cn("mr-2 h-5 w-5", isFavorite(recipe.id) ? "fill-current" : "")} />
          {isFavorite(recipe.id) ? 'Favorited' : 'Add to Favorites'}
        </Button>
      </CardFooter>
    </Card>
  );
}

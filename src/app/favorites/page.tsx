"use client";

import { useFavorites } from '@/hooks/use-favorites';
import RecipeCard from '@/components/recipe-card';
import { Star } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-muted-foreground">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-2">
        <Star className="h-8 w-8" />
        Your Favorite Recipes
      </h1>
      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">You haven't saved any favorite recipes yet.</p>
          <p className="text-muted-foreground">Start exploring and mark your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

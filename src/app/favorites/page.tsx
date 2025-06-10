
"use client";

import { useState } from 'react';
import type { Recipe } from '@/lib/types';
import { useFavorites } from '@/hooks/use-favorites';
import RecipeCard from '@/components/recipe-card';
import SmallFavoriteCard from '@/components/small-favorite-card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites, isLoaded: favoritesLoaded } = useFavorites();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleShowRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDialogOpen(true);
  };

  const onDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setSelectedRecipe(null);
    }
  };

  if (!favoritesLoaded) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
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
        <div className="text-center py-10 border-2 border-dashed border-muted-foreground/30 rounded-lg">
          <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">You haven't saved any favorite recipes yet.</p>
          <p className="text-muted-foreground">Start exploring and mark your favorites on the main page!</p>
           <Button asChild variant="link" className="mt-4 text-primary">
            <Link href="/">Find Recipes</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <SmallFavoriteCard
              key={recipe.id}
              recipe={recipe}
              onShowRecipe={() => handleShowRecipe(recipe)}
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <Dialog open={isDialogOpen} onOpenChange={onDialogChange}>
          <DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] flex flex-col rounded-lg">
            <DialogHeader className="pr-10"> 
              <DialogTitle className="font-headline text-2xl text-primary truncate">
                {selectedRecipe.recipeName}
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto flex-grow py-4"> 
              <RecipeCard recipe={selectedRecipe} className="shadow-none border-none"/>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

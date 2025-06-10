
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
  DialogClose // Explicitly import DialogClose if needed for custom close button
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star, X } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleShowRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDialogOpen(true);
  };

  const onDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setSelectedRecipe(null); // Clear selected recipe when dialog closes
    }
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            <DialogHeader className="pr-10"> {/* Add padding for the close button */}
              <DialogTitle className="font-headline text-2xl text-primary truncate">
                {selectedRecipe.recipeName}
              </DialogTitle>
              {/* The default DialogContent includes an X close button, 
                  but if you need more control, you can use DialogClose:
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
              */}
            </DialogHeader>
            <div className="overflow-y-auto flex-grow py-4"> {/* Add py-4 for spacing */}
              <RecipeCard recipe={selectedRecipe} className="shadow-none border-none"/> {/* Remove shadow/border from inner card if desired */}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}


"use client";

import type { Recipe } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface SmallFavoriteCardProps {
  recipe: Recipe;
  onShowRecipe: () => void;
}

export default function SmallFavoriteCard({ recipe, onShowRecipe }: SmallFavoriteCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg">
      <CardHeader className="flex-grow pb-2">
        <CardTitle className="text-lg font-headline line-clamp-2 leading-tight">
          {recipe.recipeName}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground pt-1 line-clamp-1">
          {recipe.cuisine}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        <Button onClick={onShowRecipe} className="w-full" variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          Show Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}

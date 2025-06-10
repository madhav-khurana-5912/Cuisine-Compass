"use client";

import type { Recipe } from '@/lib/types';
import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'cuisineCompassFavorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites from localStorage:", error);
        // Optionally clear corrupted data
        // localStorage.removeItem(FAVORITES_KEY);
      }
      setIsLoaded(true);
    }
  }, []);

  const saveFavorites = useCallback((updatedFavorites: Recipe[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
      } catch (error) {
        console.error("Failed to save favorites to localStorage:", error);
      }
    }
  }, []);

  const addFavorite = useCallback((recipe: Recipe) => {
    if (!isLoaded) return; // Don't operate if not loaded
    // Ensure recipe has an id
    const recipeWithId = { ...recipe, id: recipe.id || `${recipe.recipeName}-${recipe.cuisine}-${Date.now()}` };
    
    saveFavorites([...favorites.filter(fav => fav.id !== recipeWithId.id), recipeWithId]);
  }, [favorites, saveFavorites, isLoaded]);

  const removeFavorite = useCallback((recipeId: string) => {
    if (!isLoaded) return;
    saveFavorites(favorites.filter(fav => fav.id !== recipeId));
  }, [favorites, saveFavorites, isLoaded]);

  const isFavorite = useCallback((recipeId: string) => {
    if (!isLoaded) return false;
    return favorites.some(fav => fav.id === recipeId);
  }, [favorites, isLoaded]);

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}

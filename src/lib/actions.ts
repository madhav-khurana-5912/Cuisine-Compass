"use server";

import { generateRecipe as callGenerateRecipeFlow } from '@/ai/flows/enhance-recipe-prompt';
import type { GenerateRecipeInput, GenerateRecipeOutput } from '@/ai/flows/enhance-recipe-prompt';
import type { Recipe } from '@/lib/types';

interface ActionResult {
  recipe?: Recipe;
  error?: string;
}

export async function generateRecipeAction(
  cuisine: string,
  additionalConsiderations?: string
): Promise<ActionResult> {
  if (!cuisine || cuisine.trim() === "") {
    return { error: "Cuisine cannot be empty." };
  }

  const input: GenerateRecipeInput = { cuisine };
  if (additionalConsiderations && additionalConsiderations.trim() !== "") {
    input.additionalConsiderations = additionalConsiderations;
  }

  try {
    const aiOutput: GenerateRecipeOutput = await callGenerateRecipeFlow(input);
    
    const recipe: Recipe = {
      // Generate a more robust ID client-side if needed before saving to favorites,
      // or use recipeName + cuisine for display purposes.
      // For now, let's use a combination that's somewhat unique for display.
      id: `${aiOutput.recipeName}-${cuisine}-${Date.now()}`, 
      recipeName: aiOutput.recipeName,
      cuisine: cuisine,
      ingredients: aiOutput.ingredients,
      instructions: aiOutput.instructions,
      additionalConsiderations: input.additionalConsiderations,
    };
    return { recipe };
  } catch (e) {
    console.error("Error generating recipe:", e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred while generating the recipe.";
    return { error: `Failed to generate recipe. ${errorMessage}` };
  }
}

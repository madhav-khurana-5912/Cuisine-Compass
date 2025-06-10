'use server';

/**
 * @fileOverview Enhanced recipe generation flow with additional considerations.
 *
 * - generateRecipe - A function that handles the recipe generation process.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeInputSchema = z.object({
  cuisine: z.string().describe('The type of cuisine for the recipe.'),
  additionalConsiderations: z
    .string()
    .optional()
    .describe('Any additional considerations or preferences for the recipe.'),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  ingredients: z.array(z.string()).describe('The list of ingredients required for the recipe.'),
  instructions: z.string().describe('The step-by-step instructions to prepare the recipe.'),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  output: {schema: GenerateRecipeOutputSchema},
  prompt: `You are a world-class chef specializing in various cuisines.
  Your task is to generate a recipe based on the user's specified cuisine and any additional considerations.

  Cuisine: {{{cuisine}}}
  {{~#if additionalConsiderations}}
  Additional Considerations: {{{additionalConsiderations}}}
  {{~/if}}

  Please provide the recipe in the following format:
  Recipe Name:
  Ingredients: (List each ingredient with quantity)
  Instructions: (Provide step-by-step instructions)
  `,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

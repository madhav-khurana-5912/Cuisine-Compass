export interface Recipe {
  id: string;
  recipeName: string;
  cuisine: string;
  ingredients: string[];
  instructions: string; // Raw string, potentially newline separated
  utensils: string[];
  additionalConsiderations?: string;
}

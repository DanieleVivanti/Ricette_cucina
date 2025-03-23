export interface Recipe {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  preparationTime: number;
  cookingTime: number;
  servings: number;
  difficulty: 'Facile' | 'Media' | 'Difficile';
  category: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRecipeDto {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  preparationTime: number;
  cookingTime: number;
  servings: number;
  difficulty: 'Facile' | 'Media' | 'Difficile';
  category: string;
  image?: File;
}

export interface UpdateRecipeDto extends Partial<CreateRecipeDto> {} 
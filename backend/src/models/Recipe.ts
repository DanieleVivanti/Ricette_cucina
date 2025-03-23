import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  category: string;
  preparationTime: number;
  cookingTime: number;
  servings: number;
  difficulty: 'facile' | 'medio' | 'difficile';
  createdAt: Date;
  updatedAt: Date;
}

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  preparationTime: { type: Number, required: true },
  cookingTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  difficulty: { 
    type: String, 
    required: true,
    enum: ['facile', 'medio', 'difficile']
  }
}, {
  timestamps: true
});

export default mongoose.model<IRecipe>('Recipe', RecipeSchema); 
import React, { useState, useEffect } from 'react';
import { Recipe, CreateRecipeDto } from '../types/Recipe';

interface RecipeFormProps {
  recipe?: Recipe;
  onSubmit: (recipe: CreateRecipeDto) => void;
  onCancel: () => void;
}

export default function RecipeForm({ recipe, onSubmit, onCancel }: RecipeFormProps) {
  const [title, setTitle] = useState(recipe?.title || '');
  const [description, setDescription] = useState(recipe?.description || '');
  const [ingredients, setIngredients] = useState<string[]>(recipe?.ingredients || ['']);
  const [instructions, setInstructions] = useState<string[]>(recipe?.instructions || ['']);
  const [preparationTime, setPreparationTime] = useState(recipe?.preparationTime || 0);
  const [cookingTime, setCookingTime] = useState(recipe?.cookingTime || 0);
  const [servings, setServings] = useState(recipe?.servings || 1);
  const [difficulty, setDifficulty] = useState<'Facile' | 'Media' | 'Difficile'>(recipe?.difficulty || 'Media');
  const [category, setCategory] = useState(recipe?.category || '');
  const [image, setImage] = useState<File | null>(null);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const handleRemoveInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipeData: CreateRecipeDto = {
      title,
      description,
      ingredients: ingredients.filter(i => i.trim() !== ''),
      instructions: instructions.filter(i => i.trim() !== ''),
      preparationTime,
      cookingTime,
      servings,
      difficulty,
      category,
      ...(image && { image }),
    };
    onSubmit(recipeData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Titolo</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrizione</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ingredienti</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveIngredient(index)}
              className="px-2 py-1 text-red-600 hover:text-red-800"
            >
              Rimuovi
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddIngredient}
          className="mt-2 text-primary-600 hover:text-primary-800"
        >
          + Aggiungi ingrediente
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Istruzioni</label>
        {instructions.map((instruction, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <textarea
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              rows={2}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveInstruction(index)}
              className="px-2 py-1 text-red-600 hover:text-red-800"
            >
              Rimuovi
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddInstruction}
          className="mt-2 text-primary-600 hover:text-primary-800"
        >
          + Aggiungi istruzione
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tempo di preparazione (minuti)</label>
          <input
            type="number"
            value={preparationTime}
            onChange={(e) => setPreparationTime(Number(e.target.value))}
            min="0"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tempo di cottura (minuti)</label>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(Number(e.target.value))}
            min="0"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Porzioni</label>
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            min="1"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Difficoltà</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'Facile' | 'Media' | 'Difficile')}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="Facile">Facile</option>
            <option value="Media">Media</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoria</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Immagine</label>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="mt-1 block w-full"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Annulla
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          Salva
        </button>
      </div>
    </form>
  );
} 
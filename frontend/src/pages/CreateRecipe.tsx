import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe, CreateRecipeDto } from '../types/Recipe';
import { recipeService } from '../services/recipeService';
import RecipeForm from '../components/RecipeForm';

export function CreateRecipe() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (recipeData: CreateRecipeDto) => {
    try {
      await recipeService.create(recipeData);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante la creazione della ricetta');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Crea Nuova Ricetta</h1>
      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <RecipeForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
} 
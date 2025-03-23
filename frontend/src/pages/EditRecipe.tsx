import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Recipe, CreateRecipeDto, UpdateRecipeDto } from '../types/Recipe';
import { recipeService } from '../services/recipeService';
import RecipeForm from '../components/RecipeForm';

export function EditRecipe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!id) {
          throw new Error('ID ricetta non valido');
        }
        const data = await recipeService.getById(id);
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Errore nel caricamento della ricetta');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (updatedRecipe: CreateRecipeDto) => {
    try {
      if (!id) {
        throw new Error('ID ricetta non valido');
      }
      await recipeService.update(id, updatedRecipe);
      navigate(`/recipe/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante il salvataggio della ricetta');
    }
  };

  const handleCancel = () => {
    navigate(id ? `/recipe/${id}` : '/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          Ricetta non trovata
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Modifica Ricetta</h1>
      <RecipeForm
        recipe={recipe}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
} 
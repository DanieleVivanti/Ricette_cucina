import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Recipe } from '../types/Recipe';
import { recipeService } from '../services/recipeService';
import { ClockIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export function RecipeDetail() {
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

  const handleDelete = async () => {
    if (!id || !recipe) return;

    if (window.confirm('Sei sicuro di voler eliminare questa ricetta?')) {
      try {
        await recipeService.delete(id);
        navigate('/');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Errore durante l\'eliminazione della ricetta');
      }
    }
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
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <div className="space-x-4">
            <Link
              to={`/recipe/edit/${recipe._id}`}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Modifica
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Elimina
            </button>
          </div>
        </div>

        {recipe.imageUrl && (
          <img
            src={`http://localhost:5000${recipe.imageUrl}`}
            alt={recipe.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700 mb-6">{recipe.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Tempo Preparazione</h3>
              <p className="mt-1 text-lg">{recipe.preparationTime} min</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Tempo Cottura</h3>
              <p className="mt-1 text-lg">{recipe.cookingTime} min</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Porzioni</h3>
              <p className="mt-1 text-lg">{recipe.servings}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Difficoltà</h3>
              <p className="mt-1 text-lg">{recipe.difficulty}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Ingredienti</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Istruzioni</h2>
            <ol className="list-decimal list-inside space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-700">{instruction}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="text-primary-600 hover:text-primary-800"
          >
            ← Torna alla lista delle ricette
          </Link>
        </div>
      </div>
    </div>
  );
} 
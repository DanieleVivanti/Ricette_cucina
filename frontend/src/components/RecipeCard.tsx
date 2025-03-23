import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types/Recipe';
import { ClockIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/recipe/${recipe._id}`}>
        <div className="relative h-48">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-800">
            {recipe.difficulty}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>{recipe.preparationTime + recipe.cookingTime} min</span>
            </div>
            <div className="flex items-center">
              <UserGroupIcon className="h-4 w-4 mr-1" />
              <span>{recipe.servings} persone</span>
            </div>
            <div className="flex items-center">
              <ChartBarIcon className="h-4 w-4 mr-1" />
              <span>{recipe.category}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}; 
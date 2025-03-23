import axios from 'axios';
import { Recipe, CreateRecipeDto, UpdateRecipeDto } from '../types/Recipe';

const API_URL = 'http://localhost:5000/api';

export const recipeService = {
  async getAll(): Promise<Recipe[]> {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data;
  },

  async getById(id: string): Promise<Recipe> {
    const response = await axios.get(`${API_URL}/recipes/${id}`);
    return response.data;
  },

  async create(recipe: CreateRecipeDto): Promise<Recipe> {
    const formData = new FormData();
    Object.entries(recipe).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        formData.append('image', value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, String(value));
      }
    });

    const response = await axios.post(`${API_URL}/recipes`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async update(id: string, recipe: UpdateRecipeDto): Promise<Recipe> {
    const formData = new FormData();
    Object.entries(recipe).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        formData.append('image', value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const response = await axios.put(`${API_URL}/recipes/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/recipes/${id}`);
  },

  getByCategory: async (category: string): Promise<Recipe[]> => {
    const response = await axios.get(`${API_URL}/recipes/category/${category}`);
    return response.data;
  },
}; 
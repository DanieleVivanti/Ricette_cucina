import { Request, Response } from 'express';
import Recipe, { IRecipe } from '../models/Recipe';

// Ottieni tutte le ricette
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero delle ricette' });
  }
};

// Ottieni una ricetta specifica
export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Ricetta non trovata' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero della ricetta' });
  }
};

// Crea una nuova ricetta
export const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: 'Errore nella creazione della ricetta' });
  }
};

// Aggiorna una ricetta
export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!recipe) {
      return res.status(404).json({ message: 'Ricetta non trovata' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: 'Errore nell\'aggiornamento della ricetta' });
  }
};

// Elimina una ricetta
export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Ricetta non trovata' });
    }
    res.json({ message: 'Ricetta eliminata con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nell\'eliminazione della ricetta' });
  }
};

// Cerca ricette per categoria
export const searchRecipesByCategory = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find({ category: req.params.category });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Errore nella ricerca delle ricette' });
  }
}; 
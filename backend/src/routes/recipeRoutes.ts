import express from 'express';
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipesByCategory
} from '../controllers/recipeController';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

// Routes per le ricette
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', upload.single('image'), createRecipe);
router.put('/:id', upload.single('image'), updateRecipe);
router.delete('/:id', deleteRecipe);
router.get('/category/:category', searchRecipesByCategory);

export default router; 
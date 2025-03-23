import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateRecipe } from './pages/CreateRecipe';
import { RecipeDetail } from './pages/RecipeDetail';
import { EditRecipe } from './pages/EditRecipe';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <a href="/" className="text-xl font-bold text-primary-600">
                Ricette di Cucina
              </a>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/new" element={<CreateRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/recipe/edit/:id" element={<EditRecipe />} />
        </Routes>
      </div>
    </Router>
  );
} 
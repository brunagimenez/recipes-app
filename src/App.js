import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import MealInProgress from './components/MealInProgress';
import DrinkInProgress from './components/DrinkInProgress';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  const [recipe, setRecipe] = useState();

  return (
    <Switch>
      <Route path="/meals/:id/in-progress">
        <MealInProgress setRecipe={ setRecipe } />
      </Route>
      <Route path="/drinks/:id/in-progress">
        <DrinkInProgress setRecipe={ setRecipe } />
      </Route>
      <Route path="/recipe-in-progress">
        <RecipeInProgress recipe={ recipe } />
      </Route>
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/:type" component={ Recipes } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;

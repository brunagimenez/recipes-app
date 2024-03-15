import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import beef from '../images/mealCategories/beef.png';
import breakfast from '../images/mealCategories/breakfast.png';
import chicken from '../images/mealCategories/chicken.png';
import dessert from '../images/mealCategories/dessert.png';
import goat from '../images/mealCategories/goat.png';
import '../styles/RecipeInProgress.css';

export default function MealInProgress({ setRecipe }) {
  const [meal, setMeal] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const dateNow = new Date();
  const measure13 = 13;

  useEffect(() => {
    async function fetchMeal() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMeal(data.meals[0]);
      setRecipe(data.meals[0]);
      const inProgressRecipes = JSON
        .parse(localStorage.getItem('inProgressRecipes')) || {};
      const currentRecipe = inProgressRecipes[data.meals[0].idMeal] || {};
      const ingredients = Object.keys(currentRecipe)
        .filter((ingredient) => currentRecipe[ingredient])
        .map((ingredient) => ingredient);
      setCheckedIngredients(ingredients);
    }
    fetchMeal();
  }, [id, setRecipe]);

  function handleCheckboxChange(e) {
    const { name } = e.target;

    if (checkedIngredients.includes(name)) {
      setCheckedIngredients(checkedIngredients
        .filter((ingredient) => ingredient !== name));
    } else {
      setCheckedIngredients([...checkedIngredients, name]);
    }

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [meal.idMeal]: {
        ...inProgressRecipes[meal.idMeal],
        [name]: !checkedIngredients.includes(name),
      },
    }));
  }

  useEffect(() => {
    if (checkedIngredients.length === Object.keys(meal)
      .filter((key) => key.startsWith('strIngredient') && meal[key]).length) {
      setAllIngredientsChecked(true);
    } else {
      setAllIngredientsChecked(false);
    }
  }, [checkedIngredients, meal]);

  function handleFinishRecipe() {
    const doneRecipe = {
      id: meal.idMeal,
      nationality: meal.strArea,
      name: meal.strMeal,
      category: meal.strCategory,
      image: meal.strMealThumb,
      tags: meal.strTags ? meal.strTags.split(',') : [],
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: dateNow.toISOString(),
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    if (doneRecipes.some((recipe) => recipe.id === meal.idMeal)) {
      // alert('You have already finished this recipe!');
      history.push('/done-recipes');
      return;
    }

    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));

    history.push('/done-recipes');
  }

  function handleFavorite() { // Função para lidar com o clique no botão de favoritar
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes.some((recipe) => recipe.id === meal.idMeal);

    if (!isRecipeFavorited) {
      const favoriteRecipe = {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory,
        alcoholicOrNot: '',
        nationality: meal.strArea,
        type: 'meal',
      };

      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, favoriteRecipe]));

      setIsFavorite(true);
    } else {
      const filteredFavoriteRecipes = favoriteRecipes
        .filter((recipe) => recipe.id !== meal.idMeal);

      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavoriteRecipes));

      setIsFavorite(false);
    }
  }

  useEffect(() => { // Efeito para verificar se a receita já foi favoritada anteriormente
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes.some((recipe) => recipe.id === meal.idMeal);

    setIsFavorite(isRecipeFavorited);
  }, [meal.idMeal]);

  function copyLink() {
    const currentUrl = window.location.href;
    const linkWithoutInProgress = currentUrl.replace('/in-progress', '');
    clipboardCopy(linkWithoutInProgress);
    setMessage('Link copied!');
  }

  let categoryIcon;

  switch (meal.strCategory) {
  case 'Beef':
    categoryIcon = beef;
    break;

  case 'Breakfast':
    categoryIcon = breakfast;
    break;

  case 'Chicken':
    categoryIcon = chicken;
    break;

  case 'Dessert':
    categoryIcon = dessert;
    break;

  case 'Goat':
    categoryIcon = goat;
    break;

  default:
  }

  return (
    <div>
      <p className="req" data-testid="meal-in-progress"> </p>

      <div className="titleContainer">
        <h1 data-testid="recipe-title" className="recipeTitle">{meal.strMeal}</h1>
      </div>

      <img className="icon" src={ categoryIcon } alt="Category icon" />

      <p data-testid="recipe-category" className="recipeCategory">{meal.strCategory}</p>

      <div className="image-container">
        <img
          src={ meal.strMealThumb }
          alt="Recipe"
          data-testid="recipe-photo"
          className="recipePhoto"
        />
      </div>

      <div className="ingredientsContainer">
        <h3>Ingredientes:</h3>
        <ul>
          {Object.entries(meal)
            .filter(([key]) => key.startsWith('strIngredient') && meal[key])
            .map(([key, value], index) => (
              <label
                className={ checkedIngredients.includes(value)
                  ? 'checked-ingredient' : '' }
                key={ key }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  name={ value }
                  checked={ checkedIngredients.includes(value) }
                  onChange={ handleCheckboxChange }
                />
                {value}
                {' '}
                -
                {' '}
                {meal[`strMeasure${key.slice(measure13)}`]}
                {/* Como a chave strMeasure tem um número após as 12 primeiras letras, é necessário remover os primeiros 13 caracteres de key para obter apenas o número */}
              </label>
            ))}
        </ul>
      </div>

      <div className="instructionsContainer">
        <h3>Instruções:</h3>
        <p data-testid="instructions">{meal.strInstructions}</p>
      </div>

      <button type="button" onClick={ copyLink } className="shareBtn">
        <img data-testid="share-btn" src={ shareIcon } alt="Share recipe" />
      </button>

      {message && <span>{message}</span>}

      <button type="button" onClick={ handleFavorite } className="favoriteBtn">
        {isFavorite
          ? <img data-testid="favorite-btn" src={ blackHeartIcon } alt="Favorited" />
          : <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="Not favorited" />}
      </button>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked }
        onClick={ handleFinishRecipe }
        className="finishBtn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

MealInProgress.propTypes = {
  setRecipe: PropTypes.func.isRequired,
};

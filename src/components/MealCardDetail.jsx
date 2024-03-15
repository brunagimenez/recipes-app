import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Recomendations from './Recomendations';
import StartRecipeButton from './StartRecipeButton';
import copyUrl from '../utils/copyUrl';
import shareIcon from '../images/shareIcon.svg';
import white from '../images/whiteHeartIcon.svg';
import black from '../images/blackHeartIcon.svg';
import beef from '../images/mealCategories/beef.png';
import breakfast from '../images/mealCategories/breakfast.png';
import chicken from '../images/mealCategories/chicken.png';
import dessert from '../images/mealCategories/dessert.png';
import goat from '../images/mealCategories/goat.png';
import '../styles/RecipeCardDetails.css';

export default function MealCardDetail({ mealDetail }) {
  const [clickButton, setClickButton] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();
  const embedURL = mealDetail.strYoutube.split('=');
  const mealAr = Object.entries(mealDetail);
  const quantity = mealAr.filter((element) => (
    element[0].includes('strMeasure') && (
      element[1] !== ' ' && element[1] !== '' && element[1] !== null)));
  const ingredients = mealAr.filter((element) => (
    element[0].includes('strIngredient') && (element[1] !== '' && element[1] !== null)));

  function handleFavorite() { // Função para lidar com o clique no botão de favoritar
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes
      .some((recipe) => recipe.id === mealDetail.idMeal);

    if (!isRecipeFavorited) {
      const favoriteRecipe = {
        id: mealDetail.idMeal,
        name: mealDetail.strMeal,
        image: mealDetail.strMealThumb,
        category: mealDetail.strCategory,
        alcoholicOrNot: '',
        nationality: mealDetail.strArea,
        type: 'meal',
      };

      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, favoriteRecipe]));

      setFavorite(true);
    } else {
      const filteredFavoriteRecipes = favoriteRecipes
        .filter((recipe) => recipe.id !== mealDetail.idMeal);

      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavoriteRecipes));

      setFavorite(false);
    }
  }

  useEffect(() => { // Efeito para verificar se a receita já foi favoritada anteriormente
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isRecipeFavorited = favoriteRecipes
      .some((recipe) => recipe.id === mealDetail.idMeal);

    setFavorite(isRecipeFavorited);
  }, [mealDetail.idMeal]);

  let categoryIcon;

  switch (mealDetail.strCategory) {
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
      <div className="titleContainer">
        <h1 data-testid="recipe-title" className="recipeTitle">{mealDetail.strMeal}</h1>
      </div>

      <img className="icon" src={ categoryIcon } alt="Category icon" />

      <h3
        data-testid="recipe-category"
        className="recipeCategory"
      >
        {mealDetail.strCategory}
      </h3>

      <div className="image-container">
        <img
          src={ mealDetail.strMealThumb }
          alt={ mealDetail.strMeal }
          data-testid="recipe-photo"
          className="recipePhoto"
        />
      </div>

      <div className="ingredientsContainer">
        <h3>Ingredientes:</h3>
        <div className="ingredientsList">
          {ingredients.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {ingredient[1]}
              {' '}
              {quantity[index][1]}
            </li>
          ))}
        </div>
      </div>

      <div className="instructionsContainer">
        <h3>Instruções:</h3>
        <p data-testid="instructions">{mealDetail.strInstructions}</p>
      </div>

      <div className="videoContainer">
        <h3>Video:</h3>
        <iframe data-testid="video" width="560" height="315" src={ `https://www.youtube.com/embed/${embedURL[1]}` } title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture; web-share" />
      </div>

      {clickButton && (
        <span> Link copied! </span>
      )}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copyUrl(setClickButton) }
        className="shareBtn"
      >
        <img
          src={ shareIcon }
          alt="share icon"
        />
      </button>

      <button
        type="button"
        onClick={ handleFavorite }
        className="favoriteBtn"
      >
        {favorite
          ? (<img data-testid="favorite-btn" src={ black } alt="favorite" />)
          : (<img data-testid="favorite-btn" src={ white } alt="not favorite" />)}

      </button>
      <Recomendations />
      <StartRecipeButton type={ history.location.pathname } />
    </div>
  );
}

MealCardDetail.propTypes = {
  Meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strMealThumb: PropTypes.string,
    strInstructions: PropTypes.string,
  }),
}.isRequired;

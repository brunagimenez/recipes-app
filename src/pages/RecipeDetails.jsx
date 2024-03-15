import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import DrinkCardDetail from '../components/DrinkCardDetail';
import MealCardDetail from '../components/MealCardDetail';

export default function RecipeDetails({ match: { params } }) {
  const [meal, setMeal] = useState(null);
  const [drink, setDrink] = useState(null);
  const history = useHistory();
  const { id } = params;

  useEffect(() => {
    async function getMeal() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMeal(data.meals[0]);
    }
    async function getDrink() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setDrink(data.drinks[0]);
    }
    if (history.location.pathname.includes('meals')) {
      getMeal();
    }
    if (history.location.pathname.includes('drinks')) {
      getDrink();
    }
  }, [id]);

  if (!meal && !drink) {
    return <div>Loading...</div>;
  }

  if (drink !== null && meal === null) {
    return (
      <div>
        <DrinkCardDetail drinkDetail={ drink } />
      </div>
    );
  }
  if (meal !== null && drink === null) {
    return (
      <div>
        <MealCardDetail mealDetail={ meal } />
      </div>
    );
  }
}

// RecipeDetails.propTypes = {
//   params: PropTypes.string({
//   }),
// };
RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MealCarousel } from './MealCarrousel';
import '../styles/Recomendations.css';
import { DrinkCarousel } from './DrinkCarrousel';

export default function Recomendations() {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const history = useHistory();
  const fetchDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();

    setDrinks(data.drinks);
  };

  const fetchMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setMeals(data.meals);
  };
  useEffect(() => {
    if (history.location.pathname.includes('drinks')) {
      fetchMeals();
    }
    if (history.location.pathname.includes('meals')) {
      fetchDrinks();
    }
  }, []);
  // const count = 1;
  // const nextRecomendation = () => {
  //   if (count >= 3) {
  //     count = 1
  //   } else {
  //     count++;
  //   }
  //   document.getElementById(`radio${count}`).checked = true
  // };

  // setInterval(() => {
  //   nextRecomendation();
  // }, 4000);

  if (meals.length > 0) {
    return (
      <div>
        <h3 className="carousel-title">Recommended</h3>
        <MealCarousel meals={ meals } />
      </div>
    );
  }

  if (drinks.length > 0) {
    return (
      <div>
        <h3 className="carousel-title">Recommended</h3>
        <DrinkCarousel drinks={ drinks } />
      </div>

    );
  }
}

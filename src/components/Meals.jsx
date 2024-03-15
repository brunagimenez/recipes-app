import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import '../styles/Meals.css';

export default function Meals() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // nova state para armazenar a categoria selecionada
  const stateSearch = useSelector((state) => state.apiSearch);
  const maxMeals = 12;
  const maxMealsCategories = 5;
  const mealsGlobal = stateSearch.meals.slice(0, maxMeals);

  useEffect(() => {
    async function getMealsCategories() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategories(data.meals.slice(0, maxMealsCategories));
    }

    getMealsCategories();
  }, []);

  async function clearFilter() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    setMeals(data.meals.slice(0, maxMeals));
    setSelectedCategory(null); // remove a categoria selecionada
  }

  async function filterMealsByCategory(categoryName) {
    if (categoryName === selectedCategory) {
      clearFilter(); // limpa o filtro e exibe todas as receitas
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
      const data = await response.json();
      setMeals(data.meals.slice(0, maxMeals));
      setSelectedCategory(categoryName); // atualiza a categoria selecionada
    }
  }

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();

      setMeals(data.meals.slice(0, maxMeals));
    };

    fetchMeals();
  }, []);

  return (
    <>
      <Header title="Meals" showSearchIcon />
      <div className="category-btns">
        <button
          key="All"
          data-testid="All-category-filter"
          onClick={ clearFilter } // adiciona a ação de limpar o filtro
        >
          All
        </button>
        { (categories.map((category) => (
          <button
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => filterMealsByCategory(category.strCategory) }
            className={ category.strCategory === selectedCategory ? 'selected' : '' } // adiciona a classe "selected" para a categoria selecionada
          >
            {category.strCategory}
          </button>
        )))}
      </div>
      <div className="recipe-cards">
        {(mealsGlobal.length > 1)
          ? (mealsGlobal.map((meal, index) => (
            <Link to={ `/meals/${meal.idMeal}` } key={ meal.idMeal }>
              <div className="individual-recipe" data-testid={ `${index}-recipe-card` }>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </div>
            </Link>
          )))
          : (meals.map((meal, index) => (
            <Link to={ `/meals/${meal.idMeal}` } key={ meal.idMeal }>
              <div className="individual-recipe" data-testid={ `${index}-recipe-card` }>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </div>
            </Link>
          )))}
      </div>
      <Footer />
    </>
  );
}

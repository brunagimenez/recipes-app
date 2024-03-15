import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  searchName,
  searchIngredient,
  searchFirstLetter,
  searchDrinkIngredient,
  searchDrinkName,
  searchDrinkFirstLetter,
} from '../redux/actions';
import '../styles/SearchBar.css';

export default function SearchBar({ inputSearch, title }) {
  const [searchType, setSearchType] = useState('');
  const dispatch = useDispatch();
  const stateSearch = useSelector((state) => state.apiSearch);
  const { meals, drinks } = stateSearch;
  const history = useHistory();

  useEffect(() => {
    if (title === 'Meals') {
      const mealsLength = meals;
      if (mealsLength.length === 1) {
        const { idMeal } = meals[0];
        return history.push(`/meals/${idMeal}`);
      }
    }
    if (title === 'Drinks') {
      const drinksLength = drinks;
      if (drinksLength.length === 1) {
        const { idDrink } = drinks[0];
        return history.push(`/drinks/${idDrink}`);
      }
    }
  }, [history, drinks, meals, title]);

  const checkFirstLetter = () => (
    (inputSearch.length > 1)
      ? global.alert('Your search must have only 1 (one) character')
      : dispatch(searchFirstLetter(inputSearch))
  );
  const checkDrinkFirstLetter = () => (
    (inputSearch.length > 1)
      ? global.alert('Your search must have only 1 (one) character')
      : dispatch(searchDrinkFirstLetter(inputSearch))
  );

  const searchClick = async () => {
    if (title === 'Meals') {
      switch (searchType) {
      case 'ingredientSeach':
        return dispatch(searchIngredient(inputSearch));
      case 'nameSearch':
        return dispatch(searchName(inputSearch));
      default:
        return checkFirstLetter();
      }
    } else if (title === 'Drinks') {
      switch (searchType) {
      case 'ingredientSeach':
        return dispatch(searchDrinkIngredient(inputSearch));
      case 'nameSearch':
        return dispatch(searchDrinkName(inputSearch));
      default:
        return checkDrinkFirstLetter();
      }
    }
  };

  return (
    <div className="searchBar_nav_container">
      <div>
        <label htmlFor="ingredientSeach" className="searchBar_label">
          <input
            type="radio"
            id="ingredientSeach"
            data-testid="ingredient-search-radio"
            name="radioButton"
            onClick={ ({ target }) => setSearchType(target.id) }
          />
          <span>Ingredient</span>
        </label>
        <label htmlFor="nameSearch" className="searchBar_label">
          <input
            type="radio"
            id="nameSearch"
            data-testid="name-search-radio"
            name="radioButton"
            onClick={ ({ target }) => setSearchType(target.id) }
          />
          <span>Name</span>
        </label>
        <label htmlFor="firstLetterSearch" className="searchBar_label">
          <input
            type="radio"
            id="firstLetterSearch"
            data-testid="first-letter-search-radio"
            name="radioButton"
            onClick={ ({ target }) => setSearchType(target.id) }
          />
          <span>First Letter</span>
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchClick }
        className="searchBar_btn"
      >
        SEARCH
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  searchInput: PropTypes.string,
}.isRequired;

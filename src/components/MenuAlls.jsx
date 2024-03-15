import React from 'react';
import PropTypes from 'prop-types';
import allIcon from '../images/All.svg';
import drinkIcon from '../images/drinks.svg';
import mealIcon from '../images/foods.svg';

export default function MenuAlls({ filter }) {
  return (
    <div className="favorites-menu">
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => filter('all') }
        className="buttton-reset-favorite"
      >
        <img
          src={ allIcon }
          alt="all-icon"
        />
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => filter('meals') }
        className="buttton-reset-favorite"
      >
        <img
          src={ mealIcon }
          alt="meal-icon"
        />
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filter('drinks') }
        className="buttton-reset-favorite"
      >
        <img
          src={ drinkIcon }
          alt="drink-icon"
        />
      </button>
    </div>
  );
}

MenuAlls.propTypes = {
  filter: PropTypes.func,
}.isRequired;

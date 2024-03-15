import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../redux/store';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import logoIcon from '../images/iconLogo.svg';
import logoRecipes from '../images/logo Recipes app.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Header.css';

export default function Header({ title, showSearchIcon }) {
  const [searchFood, setSearchFood] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const history = useHistory();

  const navigateToProfile = () => {
    history.push('/profile');
  };

  const navigateHome = () => {
    history.push('/meals');
  };

  const handleClick = () => {
    if (searchFood === true) {
      setSearchFood(false);
    } else {
      setSearchFood(true);
    }
  };

  return (
    <section>
      <div className="header-top">
        <button onClick={ navigateHome } className="button-reset">
          <img src={ logoIcon } alt="icon logo" />
          <img src={ logoRecipes } alt="Recipes App" />
        </button>
        <div>
          {showSearchIcon && (
            <button
              className="button-reset"
              type="button"
              onClick={ () => handleClick() }
            >
              <img
                data-testid="search-top-btn"
                className="animation-icon"
                src={ searchIcon }
                alt="search icon"
              />
            </button>
          )}

          <button className="button-reset" type="button" onClick={ navigateToProfile }>
            <img
              className="animation-icon"
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile icon"
            />
          </button>
        </div>
      </div>
      <div className="title-header">
        {(title === 'Meals')
          ? (<img src={ mealIcon } alt="Meals" />)
          : (<img src={ drinkIcon } alt="Drinks" />)}
        <h1 className="title" data-testid="page-title">{title}</h1>
      </div>
      {searchFood && (
        <div className="searchBar_container">
          <input
            type="text"
            placeholder="Search"
            data-testid="search-input"
            value={ searchInput }
            className="searchBar__input"
            onChange={ ({ target }) => setSearchInput(target.value) }
          />
          <Provider store={ store }>
            <SearchBar inputSearch={ searchInput } title={ title } />
          </Provider>
        </div>
      )}
    </section>
  );
}

Header.propTypes = {
  titleName: PropTypes.string,
}.isRequired;

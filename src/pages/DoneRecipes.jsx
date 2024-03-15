import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Favorite.css';
import MenuAlls from '../components/MenuAlls';

export default function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipes(doneRecipes.map((recipe) => ({ ...recipe, message: '' })));
  }, []);

  const handleFilterClick = (event) => {
    setFilterType(event.target.name);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    if (filterType === 'all') {
      return true;
    }
    return recipe.type === filterType.toLowerCase();
  });

  function copyLink(index, type, id) {
    const recipeUrl = (`${window.location.origin}/${type}s/${id}`);
    clipboardCopy(recipeUrl);
    setRecipes((prevRecipes) => {
      const updatedRecipes = [...prevRecipes];
      updatedRecipes[index].message = 'Link copied!';
      return updatedRecipes;
    });
  }

  return (
    <BrowserRouter>
      <div>
        <Header title="Done Recipes" showSearchIcon={ false } />
        <MenuAlls filter={ handleFilterClick } />
        <div>
          {filteredRecipes.map((recipe, index) => (
            <div key={ recipe.id } className="recipes-favorites">
              <section>
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <img
                    data-testid={ `${index}
                    -horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                    className="img-recipes done-img"
                    width="200"
                  />
                </Link>
              </section>
              <section className="text-recipes">
                <Link to={ `/${recipe.type}s/${recipe.id}` } className="reset-link">
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    className="name-food"
                  >
                    {recipe.name}

                  </p>
                </Link>

                {recipe.type === 'meal' ? (
                  <div>
                    <p
                      className="category-food"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {recipe.nationality ? `${recipe.nationality} - ` : ''}
                      {recipe.category}
                    </p>
                    <p
                      data-testid={ `${index}-horizontal-done-date` }
                      className="done-date"
                    >
                      Done on:
                      {' '}
                      {recipe.doneDate}
                    </p>

                    {recipe.tags.slice(0, 2).map((tag) => (
                      <span
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        className="tag-done"
                      >
                        {tag}
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={ () => copyLink(index, recipe.type, recipe.id) }
                      className="buttton-reset-favorite"
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt="Share recipe"
                      />
                    </button>

                  </div>

                ) : (
                  <div>
                    <p
                      className="category-food"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {recipe.alcoholicOrNot}
                    </p>
                    <p
                      data-testid={ `${index}-horizontal-done-date` }
                      className="done-date"
                    >
                      Done on:
                      {' '}
                      {recipe.doneDate}
                    </p>
                    <button
                      type="button"
                      onClick={ () => copyLink(index, recipe.type, recipe.id) }
                      className="buttton-reset-favorite"
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt="Share recipe"
                      />
                    </button>
                  </div>
                )}

                {recipe.message && <span className="accert">{recipe.message}</span>}
              </section>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

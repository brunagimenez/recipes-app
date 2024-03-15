import { useState } from 'react';
import PropTypes from 'prop-types';

export function MealCarousel({ meals }) {
  const [firstIndex, setFirstIndex] = useState(0);
  const handlePrevClick = () => {
    // mover o carrossel para a esquerda
    setFirstIndex((prevIndex) => (prevIndex === 0 ? meals.length - 2 : prevIndex - 2));
  };

  const handleNextClick = () => {
    // mover o carrossel para a direita
    setFirstIndex((prevIndex) => (prevIndex === meals.length - 2 ? 0 : prevIndex + 2));
  };

  return (
    <div>
      <div className="btns-carousel">
        <button onClick={ handlePrevClick } className="btn-prev">Anterior</button>
        <button onClick={ handleNextClick } className="btn-next">Próximo</button>
      </div>
      <div className="slide-box">
        <div data-testid={ `${firstIndex}-recommendation-card` } className="re-card">

          <img src={ meals[firstIndex].strMealThumb } alt={ meals[firstIndex].strMeal } />
          <p
            data-testid={ `${firstIndex}-recommendation-title` }
          >
            {meals[firstIndex].strMeal}

          </p>
        </div>
        {meals[firstIndex + 1] && (
          <div
            data-testid={ `${firstIndex + 1}-recommendation-card` }
            className="re-card"
          >
            <img
              src={ meals[firstIndex + 1].strMealThumb }
              alt={ meals[firstIndex + 1].strMeal }
            />
            <p
              data-testid={ `${firstIndex + 1}-recommendation-title` }
            >
              {meals[firstIndex + 1].strMeal}

            </p>
          </div>
        )}
        {firstIndex === meals.length - 2 && (
          <div
            data-testid={ `${meals.length - 1}-recommendation-card` }
            className="re-card"
          >
            <p
              data-testid={ `${meals.length - 1}-recommendation-title` }
            >
              {meals[meals.length - 1].strMeal}

            </p>
            <img
              src={ meals[meals.length - 1].strMealThumb }
              alt={ meals[meals.length - 1].strMeal }
            />
          </div>
        )}
      </div>
    </div>
  );
}

MealCarousel.propTypes = {
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      strMeal: PropTypes.string.isRequired,
      strMealThumb: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

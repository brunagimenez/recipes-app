import { useState } from 'react';
import PropTypes from 'prop-types';

export function DrinkCarousel({ drinks }) {
  const [firstIndex, setFirstIndex] = useState(0);
  const handlePrevClick = () => {
    // mover o carrossel para a esquerda
    setFirstIndex((prevIndex) => (prevIndex === 0 ? drinks.length - 2 : prevIndex - 2));
  };

  const handleNextClick = () => {
    // mover o carrossel para a direita
    setFirstIndex((prevIndex) => (prevIndex === drinks.length - 2 ? 0 : prevIndex + 2));
  };

  return (
    <div>
      <div className="btns-carousel">
        <button onClick={ handlePrevClick } className="btn-prev">Anterior</button>
        <button onClick={ handleNextClick } className="btn-next">Próximo</button>
      </div>
      <div className="slide-box">
        <div data-testid={ `${firstIndex}-recommendation-card` } className="re-card">

          <img
            src={ drinks[firstIndex].strDrinkThumb }
            alt={ drinks[firstIndex].strDrink }
          />
          <p
            data-testid={ `${firstIndex}-recommendation-title` }
          >
            {drinks[firstIndex].strDrink}

          </p>
        </div>
        {drinks[firstIndex + 1] && (
          <div
            data-testid={ `${firstIndex + 1}-recommendation-card` }
            className="re-card"
          >
            <img
              src={ drinks[firstIndex + 1].strDrinkThumb }
              alt={ drinks[firstIndex + 1].strDrink }
            />
            <p
              data-testid={ `${firstIndex + 1}-recommendation-title` }
            >
              {drinks[firstIndex + 1].strDrink}

            </p>
          </div>
        )}
        {firstIndex === drinks.length - 2 && (
          <div
            data-testid={ `${drinks.length - 1}-recommendation-card` }
            className="re-card"
          >
            <img
              src={ drinks[drinks.length - 1].strDrinkThumb }
              alt={ drinks[drinks.length - 1].strDrink }
            />
            <p
              data-testid={ `${drinks.length - 1}-recommendation-title` }
            >
              {drinks[drinks.length - 1].strDrink}

            </p>
          </div>
        )}
      </div>
    </div>
  );
}

DrinkCarousel.propTypes = {
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
      strDrink: PropTypes.string.isRequired,
      strDrinkThumb: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

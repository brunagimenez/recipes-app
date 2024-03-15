import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button className="button-reset-ft drink" onClick={ () => history.push('/drinks') }>
        <img
          className="animation-icon"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink-icon"
        />
      </button>
      <button className="button-reset-ft food" onClick={ () => history.push('/meals') }>
        <img
          className="animation-icon"
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="meal-icon"
        />
      </button>
    </footer>
  );
}

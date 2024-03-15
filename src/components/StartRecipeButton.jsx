import { useHistory } from 'react-router-dom';

export default function StartRecipeButton(type) {
  const recipeSituation = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const history = useHistory();
  const url = Object.values(type);
  const id = url[0].split('/');

  if (recipeSituation && !recipeSituation[id[2]]) {
    return (
      <div className="btn-start-div">
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ () => history.push(`${url[0]}/in-progress`) }
        >
          Continue Recipe
        </button>
      </div>
    );
  } return (
    <div className="btn-start-div">
      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => history.push(`${url[0]}/in-progress`) }
      >
        Start Recipe

      </button>
    </div>
  );
}

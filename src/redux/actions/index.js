import { ingredientApi, nameApi, firstLetterApi } from '../../services/ingredientApi';
import {
  ingredientDrinkApi,
  nameDrinkApi,
  firstLetterDrinkApi,
} from '../../services/drinksApi';

export const SAVE_MEALS = 'SAVE_MEALS';
export const SAVE_DRINKS = 'SAVE_DRINKS';

export const actionMeals = (info) => ({
  type: SAVE_MEALS,
  payload: info,
});

export const actionDrinks = (info) => ({
  type: SAVE_DRINKS,
  payload: info,
});

// MEALS
export const searchIngredient = (searchInput) => async (dispatch) => {
  const ingredientResponse = await ingredientApi(searchInput);
  dispatch(actionMeals(ingredientResponse.meals));
};
//

export const searchName = (searchInput) => async (dispatch) => {
  const nameResponse = await nameApi(searchInput);
  dispatch(actionMeals(nameResponse.meals));
};

export const searchFirstLetter = (searchInput) => async (dispatch) => {
  const firstLetterResponse = await firstLetterApi(searchInput);
  dispatch(actionMeals(firstLetterResponse.meals));
};

// DRINKS
export const searchDrinkIngredient = (searchInput) => async (dispatch) => {
  const ingredientDrinkResponse = await ingredientDrinkApi(searchInput);
  dispatch(actionDrinks(ingredientDrinkResponse.drinks));
};

export const searchDrinkName = (searchInput) => async (dispatch) => {
  const nameDrinkResponse = await nameDrinkApi(searchInput);
  dispatch(actionDrinks(nameDrinkResponse.drinks));
};

export const searchDrinkFirstLetter = (searchInput) => async (dispatch) => {
  const firstLetterDrinkResponse = await firstLetterDrinkApi(searchInput);
  dispatch(actionDrinks(firstLetterDrinkResponse.drinks));
};

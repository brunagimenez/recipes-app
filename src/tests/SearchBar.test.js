import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Meals from '../components/Meals';
import mockChickenFetch from './mocks/chickenData';
import mockSoupFetch from './mocks/soupData';
import mockletterYFetch from './mocks/yMealsData';
import mockEverClearFetch from './mocks/everclearData';
import mockAbileneFetch from './mocks/abileneData';
import mockletterYDrksFetch from './mocks/yDrinksData';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const testIdSearchTopBtn = 'search-top-btn';
const testIdSearchInput = 'search-input';
const testIdSearchIngredientRadio = 'ingredient-search-radio';
const testIdSearchNameRadio = 'name-search-radio';
const testIdSearchFirstLetterRadio = 'first-letter-search-radio';
const testIdSearchButton = 'exec-search-btn';
// const testIdRecipeTitle = 'recipe-title';
// const testIdRecipeCard = '1-recipe-card';

describe('Testes de elementos do component SearchBar.js', () => {
  test('Testa se os elementos da barra de busca estão presentes', async () => {
    renderWithRouterAndRedux(<Meals />);

    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeVisible();

    const ingredientRadio = screen.getByTestId(testIdSearchIngredientRadio);
    expect(ingredientRadio).toBeVisible();

    const nameRadio = screen.getByTestId(testIdSearchNameRadio);
    expect(nameRadio).toBeVisible();

    const firstLetterRadio = screen.getByTestId(testIdSearchFirstLetterRadio);
    expect(firstLetterRadio).toBeVisible();

    const searchButton = screen.getByTestId(testIdSearchButton);
    expect(searchButton).toBeVisible();
  });
});

describe('Testa busca pela radio ingredient de SearchBar.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockChickenFetch);
  });

  test('Meals: Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const ingredientRadio = screen.getByTestId(testIdSearchIngredientRadio);
    userEvent.click(ingredientRadio);

    const searchInput = screen.getByTestId(testIdSearchInput);
    const ingredient = 'chicken';
    userEvent.type(searchInput, ingredient);

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);

    waitFor(() => {
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    });
  });
});

describe('Testa busca pela radio Name de SearchBar.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockSoupFetch);
  });

  test('Meals: Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const nameRadio = screen.getByTestId(testIdSearchNameRadio);
    userEvent.click(nameRadio);

    const searchInput = screen.getByTestId(testIdSearchInput);
    const typeSoup = 'soup';
    userEvent.type(searchInput, typeSoup);

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);

    waitFor(() => {
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
    });
  });
});

describe('Testa busca pela radio First Letter de SearchBar.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockletterYFetch);
  });

  test('Meals: Se o radio selecionado for First letter, a busca na API é feita corretamente pela primeira letra', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const firstLetterRadio = screen.getByTestId(testIdSearchFirstLetterRadio);
    userEvent.click(firstLetterRadio);

    const searchInput = screen.getByTestId(testIdSearchInput);
    const typeLetterY = 'y';
    userEvent.type(searchInput, typeLetterY);

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);

    waitFor(() => {
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=y');
    });
  });
});

describe('Testa busca pela radio ingredient de SearchBar.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockEverClearFetch);
  });

  test('Drinks: Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const ingredientRadio = screen.getByTestId(testIdSearchIngredientRadio);
    userEvent.click(ingredientRadio);

    const searchInput = screen.getByTestId(testIdSearchInput);
    const ingredient = 'everclear';
    userEvent.type(searchInput, ingredient);

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);

    waitFor(() => {
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=everclear');
    });
  });
});

describe('Testa busca pela radio Name de SearchBar.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockAbileneFetch);
  });

  test('Drinks: Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const nameRadio = screen.getByTestId(testIdSearchNameRadio);
    userEvent.click(nameRadio);

    const searchInput = screen.getByTestId(testIdSearchInput);
    const drinkName = 'abilene';
    userEvent.type(searchInput, drinkName);

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);

    waitFor(() => {
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=abilene');
    });
  });
});

describe('Testa busca pela radio First Letter de SearchBar.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockletterYDrksFetch);
  });

  test('Drinks: Se o radio selecionado for First letter, a busca na API é feita corretamente pela primeira letra', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    const searchTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const firstLetterRadio = screen.getByTestId(testIdSearchFirstLetterRadio);
    userEvent.click(firstLetterRadio);

    const searchInput = screen.getByTestId(testIdSearchInput);
    const letterY = 'y';
    userEvent.type(searchInput, letterY);

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);

    waitFor(() => {
      expect(fetch).toBeCalled();
      expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y');
    });
  });
});

describe('Testa alert (Your search must have only 1 (one) character)', () => {
  test('Meals: Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const searcTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searcTopBtn).toBeInTheDocument();
    userEvent.click(searcTopBtn);

    const letterRadio = screen.getByTestId(testIdSearchFirstLetterRadio);
    userEvent.click(letterRadio);

    const searchinput = screen.getByTestId(testIdSearchInput);
    const lettersGA = 'ga';
    userEvent.type(searchinput, lettersGA);

    const searchbtn = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchbtn);

    waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
  });
});

describe('Testa alert (Your search must have only 1 (one) character)', () => {
  test('Drinks: Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    const alert = jest.spyOn(window, 'alert').mockImplementation(() => { });

    const searcTopBtn = screen.getByTestId(testIdSearchTopBtn);
    expect(searcTopBtn).toBeInTheDocument();
    userEvent.click(searcTopBtn);

    const letterRadio = screen.getByTestId(testIdSearchFirstLetterRadio);
    userEvent.click(letterRadio);

    const searchinput = screen.getByTestId(testIdSearchInput);
    const lettersGA = 'ga';
    userEvent.type(searchinput, lettersGA);

    const searchbtn = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchbtn);

    waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
  });
});

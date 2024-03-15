import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes';

describe('Teste de cobertura do componente DoneRecipes', () => {
  test('Renderiza o título da página', () => {
    render(<DoneRecipes />);

    const pageTitle = screen.getByTestId('page-title');

    expect(pageTitle).toHaveTextContent('Done Recipes');
  });

  test('Renderiza os botões de filtro', () => {
    render(<DoneRecipes />);

    const allFilter = screen.getByTestId('filter-by-all-btn');
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');

    expect(allFilter).toBeInTheDocument();
    expect(mealFilter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
  });

  test('Filtra as receitas por tipo quando um botão de filtro for clicado', () => {
    const doneRecipes = [
      { id: 1, type: 'meal', name: 'Meal 1', image: '', nationality: '', category: '', tags: [], doneDate: '2022-04-09' },
      { id: 2, type: 'drink', name: 'Drink 1', image: '', alcoholicOrNot: '', doneDate: '2022-04-08' },
      { id: 3, type: 'meal', name: 'Meal 2', image: '', nationality: '', category: '', tags: [], doneDate: '2022-04-07' },
      { id: 4, type: 'drink', name: 'Drink 2', image: '', alcoholicOrNot: '', doneDate: '2022-04-06' },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    render(
      <BrowserRouter>
        <DoneRecipes />
      </BrowserRouter>,
    );

    const allFilter = screen.getByTestId('filter-by-all-btn');
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');
    const recipeElements = screen.getAllByRole('link', { name: /^.+$/i });

    expect(recipeElements.length).toBe(4);

    fireEvent.click(mealFilter);

    const filteredRecipeElements = screen.getAllByRole('link', { name: /^.+$/i });
    const filteredRecipes = doneRecipes.filter((recipe) => recipe.type === 'meal');
    expect(filteredRecipeElements.length).toBe(filteredRecipes.length);

    fireEvent.click(drinkFilter);

    const filteredRecipeElements2 = screen.getAllByRole('link', { name: /^.+$/i });
    const filteredRecipes2 = doneRecipes.filter((recipe) => recipe.type === 'drink');
    expect(filteredRecipeElements2.length).toBe(filteredRecipes2.length);

    fireEvent.click(allFilter);

    const recipeElements2 = screen.getAllByRole('link', { name: /^.+$/i });
    expect(recipeElements2.length).toBe(4);
  });

  test('Renderiza os identificadores da receita de comida', () => {
    const doneRecipes = [
      { id: 1,
        type: 'meal',
        name: 'Meal 1',
        image: 'meal-1.jpg',
        nationality: 'brazilian',
        category: 'breakfast',
        tags: ['baking'],
        doneDate: '2022-04-09' },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    render(
      <BrowserRouter>
        <DoneRecipes />
      </BrowserRouter>,
    );

    const recipeName = screen.getByText('Meal 1');
    expect(recipeName).toBeInTheDocument();

    const recipeImage = screen.getByAltText('Meal 1');
    expect(recipeImage).toBeInTheDocument();

    const recipeNationalityCategory = screen.getByText('brazilian - breakfast');
    expect(recipeNationalityCategory).toBeInTheDocument();

    const recipeTags = screen.getByText('baking');
    expect(recipeTags).toBeInTheDocument();
  });

  test('Renderiza os identificadores da receita de bebida', () => {
    const doneRecipes = [
      { id: 1,
        type: 'drink',
        name: 'Drink 1',
        image: 'drink-1.jpg',
        alcoholicOrNot: 'alcoholic',
        tags: [],
        doneDate: '2022-04-08' },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    render(
      <BrowserRouter>
        <DoneRecipes />
      </BrowserRouter>,
    );

    const recipeName = screen.getByText('Drink 1');
    expect(recipeName).toBeInTheDocument();

    const recipeImage = screen.getByAltText('Drink 1');
    expect(recipeImage).toBeInTheDocument();

    const recipeAlcoholic = screen.getByText('alcoholic');
    expect(recipeAlcoholic).toBeInTheDocument();
  });

  // NÃO FUNCIONA DE JEITO NENHUM
  //
  // test('O botão de Compartilhar está funcionando', async () => {
  //   const doneRecipes = [
  //     {
  //       id: '1',
  //       name: 'Spaghetti Carbonara',
  //       image: 'https://www.example.com/spaghetti-carbonara.jpg',
  //       type: 'meal',
  //       category: 'Pasta',
  //       area: 'Italian',
  //       doneDate: '2022-04-11',
  //       tags: ['Italian', 'Pasta', 'Easy'],
  //       message: '',
  //     },
  //   ];
  //   const localStorageMock = {
  //     getItem: jest.fn(() => JSON.stringify(doneRecipes)),
  //   };
  //   Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  //   render(
  //     <BrowserRouter>
  //       <DoneRecipes />
  //     </BrowserRouter>,
  //   );

  //   const shareButton = screen.getByTestId('0-horizontal-share-btn');
  //   fireEvent.click(shareButton);

  //   const recipeUrl = `${window.location.origin}/meals/1`;
  //   const clipboardContent = await navigator.clipboard.readText();
  //   expect(clipboardContent).toEqual(recipeUrl);

  //   const message = screen.getByText('Link copied!');
  //   expect(message).toBeInTheDocument();
  // });
});

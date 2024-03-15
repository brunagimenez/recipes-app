import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import RecipeInProgress from '../pages/RecipeInProgress';

describe('Teste de funcionalidade do componente RecipeInProgress', () => {
  test('Os componentes estão presentes na tela', () => {
    render(
      <MemoryRouter>
        <RecipeInProgress />
      </MemoryRouter>,
    );

    const recipeImg = screen.getByTestId('recipe-photo');
    expect(recipeImg).toBeInTheDocument();

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const ShareRecipeBtn = screen.getByRole('button', { name: 'Compartilhar' });
    expect(ShareRecipeBtn).toBeInTheDocument();

    const favoriteRecipeBtn = screen.getByRole('button', { name: 'Favoritar' });
    expect(favoriteRecipeBtn).toBeInTheDocument();

    const finishRecipeBtn = screen.getByRole('button', { name: 'Finalizar Receita' });
    expect(finishRecipeBtn).toBeInTheDocument();
  });

  test('Renderiza o componente MealInProgress quando o tipo de receita é "meals"', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals/2/in-progress'] }>
        <Route path="/:type/:id/in-progress">
          <RecipeInProgress type="meals" />
        </Route>
      </MemoryRouter>,
    );
    const mealComponent = screen.getByTestId('meal-in-progress');
    expect(mealComponent).toBeInTheDocument();
  });

  test('Renderiza o componente DrinkInProgress quando o tipo de receita é "drinks"', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks/1/in-progress'] }>
        <Route path="/:type/:id/in-progress">
          <RecipeInProgress type="drinks" />
        </Route>
      </MemoryRouter>,
    );
    const drinkComponent = screen.getByTestId('drink-in-progress');
    expect(drinkComponent).toBeInTheDocument();
  });
});

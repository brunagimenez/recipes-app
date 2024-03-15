import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Recipes from '../pages/Recipes';

describe('Testa a funcionalidade da página Recipes', () => {
  test('Renderiza a página Meals quando type é meals', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Route path="/:type" component={ Recipes } />
      </MemoryRouter>,
    );
    const mealsTitle = await screen.findByText(/meals/i);
    expect(mealsTitle).toBeInTheDocument();
  });

  test('Renderiza a página Drinks quando type é drinks', async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Route path="/:type" component={ Recipes } />
      </MemoryRouter>,
    );
    const drinksTitle = await screen.findByText(/drinks/i);
    expect(drinksTitle).toBeInTheDocument();
  });
});

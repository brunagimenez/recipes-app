import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import Footer from '../components/Footer';

describe('Testa o footer', () => {
  it('Testa se os inputs estão no footer', () => {
    renderWithRouter(<Footer />);
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    const btnMeals = screen.getByTestId('meals-bottom-btn');
    expect(btnDrinks).toBeInTheDocument();
    expect(btnMeals).toBeInTheDocument();
  });
  it('Testa se os botões redirecionam para a página correta.', () => {
    const { history } = renderWithRouter(<Footer />);
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    const btnMeals = screen.getByTestId('meals-bottom-btn');
    userEvent.click(btnDrinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
    userEvent.click(btnMeals);
    expect(pathname).toBe('/drinks');
  });
});

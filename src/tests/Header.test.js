import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { Provider } from 'react-redux';
// import renderPath from './helpers/renderPath';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Profile from '../pages/Profile';
import App from '../App';
// import DoneRecipes from '../pages/DoneRecipes';
// import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Teste de funcionalidade do componente Header', () => {
  const searchTopBtn = 'search-top-btn';
  const profileTopBtn = 'profile-top-btn';
  const pageTitle = 'page-title';
  const inputSearch = 'search-input';

  test('Os componentes estão na tela da página Meals', () => {
    renderWithRouterAndRedux(<Meals />);

    const searchBtn = screen.getByTestId(searchTopBtn);
    const profileBtn = screen.getByTestId(profileTopBtn);
    const pageTl = screen.getByTestId(pageTitle);

    expect(searchBtn).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(pageTl).toBeInTheDocument();
  });

  test('Os componentes estão na tela da página Drinks', () => {
    renderWithRouterAndRedux(<Drinks />);

    const searchBtn = screen.getByTestId(searchTopBtn);
    const profileBtn = screen.getByTestId(profileTopBtn);
    const pageTl = screen.getByTestId(pageTitle);

    expect(searchBtn).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(pageTl).toBeInTheDocument();
  });

  test('Os componentes estão na tela da página Profile', () => {
    renderWithRouterAndRedux(<Profile />);

    const profileBtn = screen.getByTestId(profileTopBtn);
    const pageTl = screen.getByTestId(pageTitle);

    expect(profileBtn).toBeInTheDocument();
    expect(pageTl).toBeInTheDocument();
  });

  test('Ao clicar no botão ProfileBtn, é redirecionado para a página Profile', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const profileBtn = screen.getByTestId(profileTopBtn);
    userEvent.click(profileBtn);

    const profileTitle = screen.getByText('Profile');

    expect(profileTitle).toBeInTheDocument();
  });

  test('Aparece um input de pesquisa ao clicar no botão search e desaparece se clicar novamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const searchBtn = screen.getByTestId(searchTopBtn);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const searchChange = screen.getByTestId(inputSearch);
    expect(searchChange).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(searchChange).not.toBeInTheDocument();
  });

  test('Ao digitar no Input search ele adiciona o valor', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    const searchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchBtn);

    const searchChange = screen.getByTestId(inputSearch);
    userEvent.type(searchChange, 'sushi');
    expect(searchChange).toHaveValue('sushi');
  });
});

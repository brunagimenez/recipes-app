import { fireEvent, screen, userEvent, waitFor } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('Testa o componente Favorite Recipes', () => {
  const favoritePath = '/favorite-recipes';
  it('Testa se os inputs de filtro estão na tela', () => {
    const recipeObj = [{
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg' }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    renderWithRouter(<FavoriteRecipes />);
    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    const btnDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(btnAll).toBeInTheDocument();
    expect(btnMeals).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();
  });
  it('Testa se as receitas favoritadas estão renderizadas na tela', () => {
    const recipeObj = [{
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg' }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    renderWithRouter(<FavoriteRecipes />);
    expect(JSON.parse(window.localStorage.getItem('favoriteRecipes'))).toStrictEqual(recipeObj);
  });
  it('Testa se o link é copiado corretamente', async () => {
    const recipeObj = [{
      id: '53065',
      type: 'meal',
      nationality: 'Japanese',
      category: 'Seafood',
      name: 'Sushi',
      image: 'https://www.themealdb.com/images/media/meals/g046bb16639s60946.jpg' }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    renderWithRouter(<FavoriteRecipes />);
    const btnShare = screen.getByRole('img', {
      name: /share icon/i,
    });
    waitFor(async () => {
      expect(btnShare).toBeInTheDocument();
      userEvent.click(btnShare);
      const clipboardContent = await navigator.clipboard.readText();
      expect(clipboardContent).toBe('http://localhost:3000/meals/53065');
    });
  });
  it('Testa se o link é copiado corretamente de uma bebida', async () => {
    const recipeObj = [{
      id: '17222',
      type: 'drink',
      nationality: 'Japanese',
      category: null,
      name: 'A1',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr15048s16928.jpg' }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    renderWithRouter(<App />, { initialEntries: [favoritePath] });
    const btnShare = screen.getByRole('img', {
      name: /share icon/i,
    });

    waitFor(() => {
      expect(btnShare).toBeInTheDocument();
      fireEvent.click(btnShare);
      const linkCopied = screen.getByText('Link copied!');
      expect(linkCopied).toBeInTheDocument();
    });
  });
  it('Testa se o link é copiado corretamente de uma comida', async () => {
    const recipeObj = [{
      id: '53065',
      type: 'meal',
      nationality: 'Japanese',
      category: 'Seafood',
      name: 'Sushi',
      image: 'https://www.themealdb.com/images/media/meals/g046bsb1663960946.jpg' }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    renderWithRouter(<App />, { initialEntries: [favoritePath] });
    const btnShare = screen.getByRole('img', {
      name: /share icon/i,
    });

    waitFor(() => {
      expect(btnShare).toBeInTheDocument();
      fireEvent.click(btnShare);
      const linkCopied = screen.getByText('Link copied!');
      expect(linkCopied).toBeInTheDocument();
    });
  });
  it('Testa se o objeto é removido do local storage ao clicar no icone de desfavoritar', async () => {
    const recipeObj = [{
      id: '53065',
      type: 'meal',
      nationality: 'Japanese',
      category: 'Seafood',
      name: 'Sushi',
      image: 'https://www.themealdb.com/images/media/meals/g046sbb1663960946.jpg' }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    renderWithRouter(<App />, { initialEntries: [favoritePath] });
    const btnFavorite = screen.getByRole('img', {
      name: /favorite icon/i,
    });

    waitFor(() => {
      expect(btnFavorite).toBeInTheDocument();
      fireEvent.click(btnFavorite);
      const obj = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(obj).toEqual([]);
    });
  });
  it('Testa se ao clicar na imagem de uma receita ocorre o redirecionamento para a página de detalhes da receita', async () => {
    const recipeObj = [{
      id: '17222',
      type: 'drink',
      nationality: 'Japanese',
      category: null,
      name: 'A1',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504s816928.jpg' }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    const { history } = renderWithRouter(<App />, { initialEntries: [favoritePath] });
    const recipeImg = screen.getByTestId('0-horizontal-image');

    expect(recipeImg).toBeInTheDocument();
    fireEvent.click(recipeImg);
    expect(history.location.pathname).toBe('/drinks/17222');
  });
  it('Testa se os filtros estão funcionando', async () => {
    const recipeObj = [{
      id: '53065',
      type: 'meal',
      nationality: 'Japanese',
      category: 'Seafood',
      name: 'Sushi',
      image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg' },
    {
      id: '17222',
      type: 'drink',
      nationality: 'Japanese',
      category: null,
      name: 'A1',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg' },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    renderWithRouter(<App />, { initialEntries: [favoritePath] });
    const btnFilterAll = screen.getByRole('button', {
      name: /all/i,
    });
    const btnFilterMeal = screen.getByRole('button', {
      name: /meals/i,
    });
    const btnFilterDrink = screen.getByRole('button', {
      name: /drinks/i,
    });
    fireEvent.click(btnFilterMeal);

    waitFor(() => {
      const obj = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(obj).toHaveLength(1);
      const btnFavorite1 = screen.getByRole('button', {
        name: /favorite icon/i,
      });
      fireEvent.click(btnFavorite1);
    });
    fireEvent.click(btnFilterDrink);

    waitFor(() => {
      const obj = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(obj).toHaveLength(1);
      const btnFavorite2 = screen.getByRole('button', {
        name: /favorite icon/i,
      });
      fireEvent.click(btnFavorite2);
    });
    fireEvent.click(btnFilterAll);
    waitFor(() => {
      const obj = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(obj).toHaveLength(2);
    });
  });
  it('Testa o botão de desfavoritar na caso o filtro de bebidas esteja ativo', () => {
    const recipeObj = [{
      id: '53065',
      type: 'meal',
      nationality: 'Japanese',
      category: 'Seafood',
      name: 'Sushi',
      image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg' },
    {
      id: '17222',
      type: 'drink',
      nationality: 'Japanese',
      category: null,
      name: 'A1',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg' },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeObj));
    renderWithRouter(<App />, { initialEntries: [favoritePath] });

    const btnFilterDrink = screen.getByRole('button', {
      name: /drinks/i,
    });
    fireEvent.click(btnFilterDrink);
    const btnShare = screen.getByRole('img', {
      name: /share icon/i,
    });
    fireEvent.click(btnShare);
    const btnFavorite = screen.getByRole('button', {
      name: /favorite icon/i,
    });
    fireEvent.click(btnFavorite);
  });
});

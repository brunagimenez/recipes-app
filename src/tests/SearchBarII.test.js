import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const testIdSearchTopBtn = 'search-top-btn';
const testIdSearchInput = 'search-input';
const testIdSearchNameRadio = 'name-search-radio';
const testIdSearchButton = 'exec-search-btn';

describe('Testa redirecionameto para tela de detalhes da receita caso uma seja encontrada', () => {
  test('Teste de receita única: SUSHI', async () => {
    const path = {
      initialEntries: ['/meals'],
    };
    const { history } = renderWithRouterAndRedux(<App />, path);

    const buttonSearch = screen.getByTestId(testIdSearchTopBtn);
    userEvent.click(buttonSearch);

    const nameSearchInput = screen.getByTestId(testIdSearchNameRadio);
    userEvent.click(nameSearchInput);

    const searchInput = screen.getByTestId(testIdSearchInput);
    userEvent.type(searchInput, 'sushi');

    const searchButton = screen.getByTestId(testIdSearchButton);
    await act(async () => {
      userEvent.click(searchButton);
    });
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53065');
    });
  });
});

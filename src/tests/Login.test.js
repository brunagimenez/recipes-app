import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
// import Login from '../pages/Login';

describe('Testa aplicação', () => {
  const testIdEmail = 'email-input';
  const testIdPassword = 'password-input';
  const submitTestId = 'login-submit-btn';
  const emailTest = 'test@test.net';
  it('Testa se os inputs estão na tela.', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(testIdEmail);
    const passwordInput = screen.getByTestId(testIdPassword);
    const submit = screen.getByTestId(submitTestId);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });
  it('Testa se o botão inicia desabilitado.', () => {
    renderWithRouter(<App />);
    const submit = screen.getByTestId(submitTestId);
    expect(submit).toBeDisabled();
  });
  it('Testa se o botão leva até a rota "/meals', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(testIdEmail);
    const passwordInput = screen.getByTestId(testIdPassword);
    const submit = screen.getByTestId(submitTestId);
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '12345678');
    waitFor(() => {
      expect(submit).toBeVisible();
      userEvent.click(submit);
      const { pathname } = history.location;
      expect(pathname).toBe('/meals');
    });
  });
  it('Testa se o botão fica habilitado após preencher o forms.', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(testIdEmail);
    const passwordInput = screen.getByTestId(testIdPassword);
    const submit = screen.getByTestId(submitTestId);
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '1234567');
    waitFor(() => {
      expect(submit).toBeVisible();
    });
  });
  it('Verifica se os dados são salvos no local storage', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(testIdEmail);
    const passwordInput = screen.getByTestId(testIdPassword);
    const submit = screen.getByTestId(submitTestId);
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '1234567');
    waitFor(() => {
      expect(submit).toBeVisible();
      userEvent.click(submit);
      const userData = JSON.parse(localStorage.getItem('user'));
      expect(userData).toBe({ email: 'test@test.net' });
    });
  });
});

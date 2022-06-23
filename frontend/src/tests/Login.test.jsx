import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/Login';
import { BrowserRouter } from 'react-router-dom';

const MockLogin = () => {
  return (
    <BrowserRouter>
      <Login/>
    </BrowserRouter>
  );
}

render(MockLogin());

describe('Login email', () => {
  const loginEmail = screen.getByTestId('LoginEmail');

  it('The email column is empty when initialised', () => {
    expect(loginEmail.value).toBe('');
  });

  it('User enter desired inputs in the field', () => {
    act(() => {
      fireEvent.change(loginEmail, { target: { value: 'roger@gmail.com' } });
    });
    expect(loginEmail.value).toBe('roger@gmail.com');
  });
});

describe('Login password', () => {
  const loginPassword = screen.getByTestId('LoginPassword');

  it('The password column is empty when initialised', () => {
    expect(loginPassword.value).toBe('');
  });

  it('User enter desired inputs in the field', async () => {
    act(() => {
      fireEvent.change(loginPassword, { target: { value: '1234567' } });
    });
    expect(loginPassword.value).toBe('1234567');
  });
});

describe('Show Password', () => {
  const showingPassword = screen.getByTestId('showingPassword');

  it('The showing password box is unchecked when initialised', () => {
    expect(showingPassword).not.toBeChecked();
  });

  it('User is able to click checkbox in order to making it checked', async () => {
    act(() => {
      fireEvent.click(showingPassword);
    });
    expect(showingPassword).toBeChecked();
  });
});

describe('Login Button', () => {
  const loginButton = screen.getByTestId('loginButton');

  it('The login bottom should exist in the page', () => {
    expect(loginButton).toBeInTheDocument();
  });
});

describe('sign up promo', () => {
  const signUpPromo = screen.getByTestId('signUpPromo');

  it('The sign up promo should exist in the page', () => {
    expect(signUpPromo).toBeInTheDocument();
  });
});

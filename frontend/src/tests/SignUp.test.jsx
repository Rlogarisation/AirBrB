import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '../components/SignUp';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const MockSignUp = () => {
  return (
    <BrowserRouter>
      <SignUp/>
    </BrowserRouter>
  );
}

render(MockSignUp());

describe('Sign up name', () => {
  const signUpName = screen.getByTestId('signUpName');

  it('The name column is empty when initialised', () => {
    expect(signUpName.value).toBe('');
  });

  it('User enter desired inputs in the field', () => {
    act(() => {
      fireEvent.change(signUpName, { target: { value: 'Roger' } });
    });
    expect(signUpName.value).toBe('Roger');
  });
});

describe('Sign up email', () => {
  const signupEmail = screen.getByTestId('signUpEmail');

  it('The email column is empty when initialised', () => {
    expect(signupEmail.value).toBe('');
  });

  it('User enter desired inputs in the field', () => {
    act(() => {
      fireEvent.change(signupEmail, { target: { value: 'roger@gmail.com' } });
    });
    expect(signupEmail.value).toBe('roger@gmail.com');
  });
});

describe('Sign up password', () => {
  const signupPassword = screen.getByTestId('signUpPassword');

  it('The password column is empty when initialised', () => {
    expect(signupPassword.value).toBe('');
  });

  it('User enter desired inputs in the field', async () => {
    act(() => {
      fireEvent.change(signupPassword, { target: { value: '1234567' } });
    });
    expect(signupPassword.value).toBe('1234567');
  });
});

describe('Confirm sign up password', () => {
  const confirmSignupPassword = screen.getByTestId('confirmSignUpPassword');

  it('The password column is empty when initialised', () => {
    expect(confirmSignupPassword.value).toBe('');
  });

  it('User enter desired inputs in the field', async () => {
    act(() => {
      fireEvent.change(confirmSignupPassword, { target: { value: '1234567' } });
    });
    expect(confirmSignupPassword.value).toBe('1234567');
  });
});

describe('Show Password Sign up page', () => {
  const showingPassword = screen.getByTestId('showingPassword');

  it('The showing password box is unchecked when initialised', () => {
    expect(showingPassword).not.toBeChecked();
  });

  it('User is able to click checkbox in order to making it checked', async () => {
    act(() => {
      // fireEvent.click(showingPassword);
      userEvent.click(showingPassword)
    });
    expect(showingPassword).toBeChecked();
  });
});

describe('Sign up Button', () => {
  const signupBottom = screen.getByTestId('signupBottom');
  it('The sign up bottom should exist in the page', () => {
    expect(signupBottom).toBeInTheDocument();
  });
});

describe('sign up promo', () => {
  const signInPromo = screen.getByTestId('signInPromo');

  it('The sign in promo should exist in the page', () => {
    expect(signInPromo).toBeInTheDocument();
  });
});

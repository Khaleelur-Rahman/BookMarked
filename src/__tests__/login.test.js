import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Import Router
import { render, fireEvent,screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the extended Jest matchers


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import App from ''
import Login from '../Pages/Login';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}))


it("Failed login by email and password", async() =>{

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  global.window = { location: { pathname: null } };
  
  // expect(window.location.href).toBe('/Login');

  const button = screen.getByTestId("login-button");

  //Check if the Login Button is present in the component
  expect(button).toBeInTheDocument();

  const emailInput =screen.getByLabelText('Email Address');
  const passwordInput = screen.getByLabelText('Password');

  //Check if the email input is present in the component
  expect(emailInput).toBeInTheDocument();

  //Check if the password input is present in the component
  expect(passwordInput).toBeInTheDocument();

  fireEvent.change(emailInput, { target: { value: 'e0959109@u.nus.edu' } });
  fireEvent.change(passwordInput, { target: { value: 'Munni123!@#' } });

  expect(emailInput.value).toBe('e0959109@u.nus.edu')
  expect(passwordInput.value).toBe('Munni123!@#')

  fireEvent.click(button);

  expect(global.window.location.pathname).toContain("/BookForm");

  // expect(toast.error).toHaveBeenCalled();

  // const errorMessage = screen.getByLabelText('Invalid Login Details!');
  // expect(errorMessage).toBeInTheDocument();

  // expect(await screen.findByText('Invalid Login Details!')).toBeInTheDocument();
})
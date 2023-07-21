import React from 'react';
import { render, screen,fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import Login from '../Pages/Login';
import BookForm from '../components/BookForm';
import '@testing-library/jest-dom'


// Test suite for Navbar
describe('Navbar', () => {
  // Test case: Presence of all the required links
  test("Presence of all the required links", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const bookSearch = screen.getByText(/Book Search/i);
    expect(bookSearch).toBeInTheDocument();

    const wishlist = screen.getByText(/WishList/i);
    expect(wishlist).toBeInTheDocument(); 

    const readlist = screen.getByText(/Readlist/i);
    expect(readlist).toBeInTheDocument(); 

    const profileIcon = screen.getByTestId("profile-icon");
    expect(profileIcon).toBeInTheDocument();
  });

  test("Shows book search form when user is logged in and when user clicks on Book Search button", async() => {
    render(
        <BrowserRouter>
            <Navbar />
            <Login />
            <BookForm />
        </BrowserRouter>
      );

      const email = screen.getByLabelText("Email Address");
      expect(email).toBeInTheDocument();
      expect(email.value).toMatch("");
    
      const password = screen.getByLabelText("Password");
      expect(password).toBeInTheDocument();
      expect(password.value).toMatch("");
    
      const registerButton = await screen.findAllByRole('button', { name: /Login/i });
      expect(registerButton).toHaveLength(1);
    
      fireEvent.change(email, { target: { value: "khaleelurrahman@gmail.com" } });
      fireEvent.change(password, { target: { value: "Munni123!@#" } });
    
      fireEvent.click(registerButton[0]);

      const bookSearchButton = screen.getByTestId("book-search");

      fireEvent.click(bookSearchButton);

      const bookTitleInput = screen.getByText(/Enter Title/i);
      expect(bookTitleInput).toBeInTheDocument();

  });

  test("Shows Login Page when user is logged out and when user clicks on Book Search button", async() => {
    render(
        <BrowserRouter>
            <Navbar />
            <Login />
        </BrowserRouter>
      );

      const bookSearchButton = screen.getByTestId("book-search");

      fireEvent.click(bookSearchButton);

      const registerButton = await screen.findAllByRole('button', { name: /Login/i });
        expect(registerButton).toHaveLength(1);
  });




});

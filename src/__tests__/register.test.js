import Register from "../Pages/Register";
import Index from "../index.html";
import { ToastContainer } from 'react-toastify';

import { fireEvent, render, screen, waitFor  } from "@testing-library/react";
import '@testing-library/jest-dom'

describe('Register', () => {
    test("Register form with email and password input should be in the document", async () => {
        const component = render(<Register />);

        const inputEmail = await component.findAllByText("Email Address");
        const inputPassword = await component.findAllByText("Password");

        expect(inputEmail).toHaveLength(1);
        expect(inputPassword).toHaveLength(1);
    });

    test("Register Button should be present in the form", async () => {
        const component = render(<Register />);

        const registerButton = await screen.findAllByRole('button', { name: /Register/i });
        expect(registerButton).toHaveLength(1);
    });

    test("Login button should be present in the form", async () => {
        const component = render(<Register />);

        const loginButton = screen.getByText("Login");
        expect(loginButton).toBeInTheDocument();
    });

    test("Display invalid email input", async () => {
        render(
            <>
              <Register />
              <ToastContainer /> {/* Wrap the component rendering in the ToastContainer */}
            </>
          );

        const email = screen.getByLabelText("Email Address");
        expect(email).toBeInTheDocument();
        expect(email.value).toMatch("");
      
        const password = screen.getByLabelText("Password");
        expect(password).toBeInTheDocument();
        expect(password.value).toMatch("");
      
        const registerButton = await screen.findAllByRole('button', { name: /Register/i });
        expect(registerButton).toHaveLength(1);
      
        fireEvent.change(email, { target: { value: "testing" } });
        fireEvent.change(password, { target: { value: "testing" } });
      
        fireEvent.click(registerButton[0]);

        await waitFor(() => {
            const toastMessage = screen.getByText(/invalid/i);
            expect(toastMessage).toBeInTheDocument();
        });     
    });

    test("Display already in use email input", async () => {
        render(
            <>
              <Register />
              <ToastContainer /> {/* Wrap the component rendering in the ToastContainer */}
            </>
          );

        const email = screen.getByLabelText("Email Address");
        expect(email).toBeInTheDocument();
        expect(email.value).toMatch("");
      
        const password = screen.getByLabelText("Password");
        expect(password).toBeInTheDocument();
        expect(password.value).toMatch("");
      
        const registerButton = await screen.findAllByRole('button', { name: /Register/i });
        expect(registerButton).toHaveLength(1);
      
        fireEvent.change(email, { target: { value: "khaleelrrahman2002@gmail.com" } });
        fireEvent.change(password, { target: { value: "Munni123!@#" } });
      
        fireEvent.click(registerButton[0]);

        await waitFor(() => {
            const toastMessage = screen.getByText(/already in use/i);
            expect(toastMessage).toBeInTheDocument();
        });     
    });

    test("Display invalid password type", async () => {
        render(
            <>
              <Register />
              <ToastContainer /> {/* Wrap the component rendering in the ToastContainer */}
            </>
          );

        const email = screen.getByLabelText("Email Address");
        expect(email).toBeInTheDocument();
        expect(email.value).toMatch("");
      
        const password = screen.getByLabelText("Password");
        expect(password).toBeInTheDocument();
        expect(password.value).toMatch("");
      
        const registerButton = await screen.findAllByRole('button', { name: /Register/i });
        expect(registerButton).toHaveLength(1);
      
        fireEvent.change(email, { target: { value: "khaleelrrahman2002@gmail.com" } });
        fireEvent.change(password, { target: { value: "Munni" } });
      
        fireEvent.click(registerButton[0]);

        await waitFor(() => {
            const toastMessage = screen.getByText(/Password should be of minimum 7 characters/i);
            expect(toastMessage).toBeInTheDocument();
        });     
    });
})

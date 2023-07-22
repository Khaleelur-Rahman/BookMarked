import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import Login from "../../Pages/Login";
import BookForm from "../BookForm";
import '@testing-library/jest-dom'
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

describe("Login", () => {
  
    test("Login form with email and password input should be in the document", async () => {
        const component = render(<Login />);

        const inputEmail = await component.findAllByText("Email Address");
        const inputPassword = await component.findAllByText("Password");

        expect(inputEmail).toHaveLength(1);
        expect(inputPassword).toHaveLength(1);
    });

    test("Login Button should be present in the form", async () => {
        const component = render(<Login />);

        const loginButtonByRole = await screen.findAllByRole('button', { name: /login/i });
        expect(loginButtonByRole).toHaveLength(1);
    });

    test("Register button should be present in the form", async () => {
        const component = render(<Login />);

        const registerButton = screen.getByText("Register");
        expect(registerButton).toBeInTheDocument();
    });

    test("Incorrect Password for registered button", async() => {
        render(
            <>
              <Login />
              <ToastContainer /> {/* Wrap the component rendering in the ToastContainer */}
            </>
          );

        const email = screen.getByLabelText("Email Address");
        expect(email).toBeInTheDocument();
        expect(email.value).toMatch("");
      
        const password = screen.getByLabelText("Password");
        expect(password).toBeInTheDocument();
        expect(password.value).toMatch("");
      
        const registerButton = await screen.findAllByRole('button', { name: /Login/i });
        expect(registerButton).toHaveLength(1);
      
        fireEvent.change(email, { target: { value: "khaleelrrahman2002@gmail.com" } });
        fireEvent.change(password, { target: { value: "Munni" } });
      
        fireEvent.click(registerButton[0]);

        await waitFor(() => {
            const toastMessage = screen.getByText(/Wrong Password/i);
            expect(toastMessage).toBeInTheDocument();
        });     
    })

    test("User not found Error", async() => {
        render(
            <>
              <Login />
              <ToastContainer /> 
            </>
          );

        const email = screen.getByLabelText("Email Address");
        expect(email).toBeInTheDocument();
        expect(email.value).toMatch("");
      
        const password = screen.getByLabelText("Password");
        expect(password).toBeInTheDocument();
        expect(password.value).toMatch("");
      
        const registerButton = await screen.findAllByRole('button', { name: /Login/i });
        expect(registerButton).toHaveLength(1);
      
        fireEvent.change(email, { target: { value: "khaleelrrahman200@gmail.com" } });
        fireEvent.change(password, { target: { value: "Munni" } });
      
        fireEvent.click(registerButton[0]);

        await waitFor(() => {
            const toastMessage = screen.getByText(/User not found/i);
            expect(toastMessage).toBeInTheDocument();
        });     
    })

    test("Empty Email address error", async() => {
        render(
            <>
              <Login />
              <ToastContainer /> 
            </>
          );

        const email = screen.getByLabelText("Email Address");
        expect(email).toBeInTheDocument();
        expect(email.value).toMatch("");
      
        const password = screen.getByLabelText("Password");
        expect(password).toBeInTheDocument();
        expect(password.value).toMatch("");
      
        const registerButton = await screen.findAllByRole('button', { name: /Login/i });
        expect(registerButton).toHaveLength(1);
      
        fireEvent.change(email, { target: { value: "" } });
        fireEvent.change(password, { target: { value: "Munni" } });
      
        fireEvent.click(registerButton[0]);

        await waitFor(() => {
            const toastMessage = screen.getByText(/Email address and password should not be empty/i);
            expect(toastMessage).toBeInTheDocument();
        });     
    })

    test("Empty Password error", async() => {
        render(
            <>
              <Login />
              <ToastContainer /> 
            </>
          );

        const email = screen.getByLabelText("Email Address");
        expect(email).toBeInTheDocument();
        expect(email.value).toMatch("");
      
        const password = screen.getByLabelText("Password");
        expect(password).toBeInTheDocument();
        expect(password.value).toMatch("");
      
        const registerButton = await screen.findAllByRole('button', { name: /Login/i });
        expect(registerButton).toHaveLength(1);
      
        fireEvent.change(email, { target: { value: "khaleelrrahman2002@gmail.com" } });
        fireEvent.change(password, { target: { value: "" } });
      
        fireEvent.click(registerButton[0]);

        await waitFor(() => {
            const toastMessage = screen.getByText(/Email address and password should not be empty/i);
            expect(toastMessage).toBeInTheDocument();
        });     
    })

    test("Both Email address and Password empty error", async() => {
        render(
            <>
              <Login />
              <ToastContainer /> 
            </>
          );

        const email = screen.getByLabelText("Email Address");
        expect(email).toBeInTheDocument();
        expect(email.value).toMatch("");
      
        const password = screen.getByLabelText("Password");
        expect(password).toBeInTheDocument();
        expect(password.value).toMatch("");
      
        const registerButton = await screen.findAllByRole('button', { name: /Login/i });
        expect(registerButton).toHaveLength(1);
      
        fireEvent.change(email, { target: { value: "" } });
        fireEvent.change(password, { target: { value: "" } });
      
        fireEvent.click(registerButton[0]);

        await waitFor(() => {
            const toastMessage = screen.getByText(/Email address and password should not be empty/i);
            expect(toastMessage).toBeInTheDocument();
        });     
    })

    test('Valid account login redirects to Book Search Page', async() => {
        render(
          <BrowserRouter>
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
    
        const bookSearch = screen.getByText(/Book Search/i);
        expect(bookSearch).toBeInTheDocument();
    
      });
})
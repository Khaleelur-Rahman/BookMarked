import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import BookForm from "../BookForm";
import "@testing-library/jest-dom";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";

/*
MOCK USER INFO THAT IS PRESENT IN THE DATABASE (If not present, add this user using email and password) : 
EMAIL: "khaleelur@gmail.com"
PASSWORD: "abc123!@#"
*/

describe("Login", () => {
  test("Login form with email and password input should be in the document", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const inputEmail = await screen.findAllByText("Email Address");
    const inputPassword = await screen.findAllByText("Password");

    expect(inputEmail).toHaveLength(1);
    expect(inputPassword).toHaveLength(1);
  });

  test("Login Button should be present in the form", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const loginButtonByRole = await screen.findAllByRole("button", {
      name: /login/i,
    });
    expect(loginButtonByRole).toHaveLength(1);
  });

  test("Register button should be present in the form", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const registerButton = screen.getByText("Register here");
    expect(registerButton).toBeInTheDocument();
  });

  test("Incorrect Password for registered button", async () => {
    render(
      <Router>
        <Login />
        <ToastContainer />
      </Router>
    );

    const email = screen.getByLabelText("Email Address");
    expect(email).toBeInTheDocument();
    expect(email.value).toMatch("");

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    expect(password.value).toMatch("");

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, {
      target: { value: "khaleelur@gmail.com" },
    });
    fireEvent.change(password, { target: { value: "abc123" } });

    fireEvent.click(registerButton[0]);

    await waitFor(() => {
      const toastMessage = screen.getByText(/Incorrect Password!/i);
      expect(toastMessage).toBeInTheDocument();
    });
  });

  test("User not found Error", async () => {
    render(
      <Router>
        <Login />
        <ToastContainer />
      </Router>
    );

    const email = screen.getByLabelText("Email Address");
    expect(email).toBeInTheDocument();
    expect(email.value).toMatch("");

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    expect(password.value).toMatch("");

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, {
      target: { value: "khaleelu@gmail.com" },
    });
    fireEvent.change(password, { target: { value: "abc123" } });

    fireEvent.click(registerButton[0]);

    await waitFor(() => {
      const toastMessage = screen.getByText(/User not found/i);
      expect(toastMessage).toBeInTheDocument();
    });
  });

  test("Empty Email address error", async () => {
    render(
      <Router>
        <Login />
        <ToastContainer />
      </Router>
    );

    const email = screen.getByLabelText("Email Address");
    expect(email).toBeInTheDocument();
    expect(email.value).toMatch("");

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    expect(password.value).toMatch("");

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, { target: { value: "" } });
    fireEvent.change(password, { target: { value: "abc123" } });

    fireEvent.click(registerButton[0]);

    await waitFor(() => {
      const toastMessage = screen.getByText(
        /Email address and password should not be empty/i
      );
      expect(toastMessage).toBeInTheDocument();
    });
  });

  test("Empty Password error", async () => {
    render(
      <Router>
        <Login />
        <ToastContainer />
      </Router>
    );

    const email = screen.getByLabelText("Email Address");
    expect(email).toBeInTheDocument();
    expect(email.value).toMatch("");

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    expect(password.value).toMatch("");

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, {
      target: { value: "khaleelur@gmail.com" },
    });
    fireEvent.change(password, { target: { value: "" } });

    fireEvent.click(registerButton[0]);

    await waitFor(() => {
      const toastMessage = screen.getByText(
        /Email address and password should not be empty/i
      );
      expect(toastMessage).toBeInTheDocument();
    });
  });

  test("Both Email address and Password empty error", async () => {
    render(
      <Router>
        <Login />
        <ToastContainer />
      </Router>
    );

    const email = screen.getByLabelText("Email Address");
    expect(email).toBeInTheDocument();
    expect(email.value).toMatch("");

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    expect(password.value).toMatch("");

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, { target: { value: "" } });
    fireEvent.change(password, { target: { value: "" } });

    fireEvent.click(registerButton[0]);

    await waitFor(() => {
      const toastMessage = screen.getByText(
        /Email address and password should not be empty/i
      );
      expect(toastMessage).toBeInTheDocument();
    });
  });

  test("Valid account login redirects to Book Search Page", async () => {
    render(
      <Router>
        <Login />
        <BookForm />
      </Router>
    );

    const email = screen.getByLabelText("Email Address");
    expect(email).toBeInTheDocument();
    expect(email.value).toMatch("");

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    expect(password.value).toMatch("");

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, { target: { value: "khaleelur@gmail.com" } });
    fireEvent.change(password, { target: { value: "abc123!@#" } });

    fireEvent.click(registerButton[0]);

    const bookSearch = screen.getByText(/Book Search/i);
    expect(bookSearch).toBeInTheDocument();
  });
});

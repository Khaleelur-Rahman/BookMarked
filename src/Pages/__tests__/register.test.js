import Register from "../Register";
import { ToastContainer } from "react-toastify";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

describe("Register", () => {
  test("Register form with email and password input should be in the document", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const inputEmail = await screen.findAllByText("Email Address");
    const inputPassword = await screen.findAllByText("Password");

    expect(inputEmail).toHaveLength(1);
    expect(inputPassword).toHaveLength(1);
  });

  test("Display invalid email input", async () => {
    render(
      <Router>
        <Register />
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
      name: /Register/i,
    });
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
      <Router>
        <Register />
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
      name: /Register/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, {
      target: { value: "khaleelur@gmail.com" },
    });
    fireEvent.change(password, { target: { value: "abc123!@#" } });

    fireEvent.click(registerButton[0]);

    await waitFor(() => {
      const toastMessage = screen.getByText(/already in use/i);
      expect(toastMessage).toBeInTheDocument();
    });
  });

  test("Display invalid password type", async () => {
    render(
      <Router>
        <Register />
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
      name: /Register/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, {
      target: { value: "khaleelur2002@gmail.com" },
    });
    fireEvent.change(password, { target: { value: "Munni" } });

    fireEvent.click(registerButton[0]);

    await waitFor(() => {
      const toastMessage = screen.getByText(
        /Password should be of minimum 7 characters/i
      );
      expect(toastMessage).toBeInTheDocument();
    });
  });

  test("Empty Email address error", async () => {
    render(
      <Router>
        <Register />
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
      name: /Register/i,
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
        <Register />
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
      name: /Register/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, {
      target: { value: "khaleelrrahman2002@gmail.com" },
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
        <Register />
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
      name: /Register/i,
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
});

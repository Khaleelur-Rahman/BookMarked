import { render, screen  } from "@testing-library/react";
import Login from "../Pages/Login";
import '@testing-library/jest-dom'

describe("Login", () => {
    test("Login form with email and password input should be in the document", async () => {
        const component = render(<Login />);

        const inputEmail = await component.findAllByText("Email Address");
        const inputPassword = await component.findAllByText("Password");
        
        expect(inputEmail).toHaveLength(1);
        expect(inputPassword).toHaveLength(1);
    })

    test("Login Button should be present in the form", async () => {
        const component = render(<Login />);

        const loginButtonByRole = await screen.findAllByRole('button', { name: /login/i });
        expect(loginButtonByRole).toHaveLength(1);
    });

})
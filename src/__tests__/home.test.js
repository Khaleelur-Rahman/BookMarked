import { render, screen  } from "@testing-library/react";
import Home from "../Pages/Home.js";

test("Renders Home page with welcome text", () => {
    render(<Home />);

    const firstStatement = screen.getByText(/Welcome to BookMarked: Where Your Book World Comes Alive!/i);
    const secondStatement = screen.getByText(/Discover, Collect, and Review Your Literary Adventures!/i);
    const thirdStatement = screen.getByText(/Unlock the Magic of Books: Register or Login Now!/i);
    expect(firstStatement).toBeTruthy();
    expect(secondStatement).toBeTruthy();
    expect(thirdStatement).toBeTruthy();
})


test("Renders Login and Register buttons for non-logged in users", async () => {
    // Mock the auth.onAuthStateChanged callback to simulate a non-logged in user
    const mockOnAuthStateChanged = jest.fn();
    jest.mock('../backend/firebase-config', () => ({
      auth: {
        onAuthStateChanged: mockOnAuthStateChanged.mockImplementation((callback) => callback(null)),
      },
    }));
  
    render(<Home />);
  
    const loginAndRegisterButtons = await screen.findAllByRole("button");
    expect(loginAndRegisterButtons).toHaveLength(2);
  });


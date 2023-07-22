import { render, screen  } from "@testing-library/react";
import Home from "../../Pages/Home.js";

test("Renders Home page with welcome text", () => {
    render(<Home />);

    const firstStatement = screen.getByText(/Welcome to BookMarked: Where Your Book World Comes Alive!/i);
    const secondStatement = screen.getByText(/Discover, Collect, and Review Your Literary Adventures!/i);
    const thirdStatement = screen.getByText(/Unlock the Magic of Books: Register or Login Now!/i);
    expect(firstStatement).toBeTruthy();
    expect(secondStatement).toBeTruthy();
    expect(thirdStatement).toBeTruthy();
})




import { render, screen  } from "@testing-library/react";
// import App from "../App.js";
import Home from "../Pages/Home.js";
import { auth } from "../backend/firebase-config";

test("Renders Home page with welcome text", () => {
    render(<Home />);

    const firstStatement = screen.getByText(/Welcome to BookMarked: Where Your Book World Comes Alive!/i);
    const secondStatement = screen.getByText(/Discover, Collect, and Review Your Literary Adventures!/i);
    const thirdStatement = screen.getByText(/Unlock the Magic of Books: Register or Login Now!/i);
    expect(firstStatement).toBeTruthy();
    expect(secondStatement).toBeTruthy();
    expect(thirdStatement).toBeTruthy();
})

// console.log(auth.currentUser)

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
  
//   test("Renders Welcome back message for logged in users", async () => {
//     // Mock the auth.onAuthStateChanged callback to simulate a logged-in user
//     const mockOnAuthStateChanged = jest.fn();
//     jest.mock('../path/to/auth', () => ({
//       auth: {
//         onAuthStateChanged: mockOnAuthStateChanged.mockImplementation((callback) =>
//           callback({ /* Mock user object here */ })
//         ),
//       },
//     }));
  
//     render(<Home />);
  
//     const welcomeBackMessage = await screen.findByText(/Welcome back/i);
//     expect(welcomeBackMessage).toBeInTheDocument();
//   });

// console.log(auth);

// if (auth.user === null) {
//     // render(<Home />);
//     test("Renders Login and Register buttons for non-logged in users", async () => {
//     render(<Home />);

    
//     const loginAndRegisterButtons = await screen.findAllByRole("button");
//     expect(loginAndRegisterButtons).toHaveLength(2);
// })
// } else {
//     test("Renders Login and Register buttons for logged in users" , async () => {
//         render(<Home />);
        
//         const element = await screen.findAllByText("Welcome back");
//         expect(element).toHaveLength(1);

//         // const displayEmail = await screen.findAllByText(/khaleelrrahman2002@gmail.com/i)
//         // expect(displayEmail).toHaveLength(1);

//     })
// }


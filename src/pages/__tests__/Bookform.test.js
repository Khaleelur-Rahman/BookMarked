import { render, screen, fireEvent } from "@testing-library/react";
import BookForm from "../BookForm";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

describe("BookForm", () => {
  test("All inputs and buttons are present", () => {
    render(
      <Router>
        <BookForm />
      </Router>
    );

    const bookTitle = screen.getByLabelText(/Enter Title/i);
    expect(bookTitle).toBeInTheDocument();

    const bookAuthor = screen.getByLabelText(/Enter Author/i);
    expect(bookAuthor).toBeInTheDocument();

    const searchButton = screen.getByTestId("bookform-submit");
    expect(searchButton).toBeInTheDocument();

    const resetButton = screen.getByTestId("bookform-reset");
    expect(resetButton).toBeInTheDocument();
  });

  test("Valid input search", async () => {
    render(
      <Router>
        <BookForm />
      </Router>
    );

    const bookTitle = screen.getByLabelText(/Enter Title/i);
    expect(bookTitle).toBeInTheDocument();

    const bookAuthor = screen.getByLabelText(/Enter Author/i);
    expect(bookAuthor).toBeInTheDocument();

    fireEvent.change(bookTitle, { target: { value: "v" } });
    fireEvent.change(bookAuthor, { target: { value: "a" } });

    const searchButton = screen.getByTestId("bookform-submit");
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);

    const results = screen.getByTestId("bookform-results");
    expect(results).toBeInTheDocument();
  });

  test("Reset form inputs", () => {
    render(
      <Router>
        <BookForm />
      </Router>
    );

    const bookTitle = screen.getByLabelText(/Enter Title/i);
    expect(bookTitle).toBeInTheDocument();

    const bookAuthor = screen.getByLabelText(/Enter Author/i);
    expect(bookAuthor).toBeInTheDocument();

    fireEvent.change(bookTitle, { target: { value: "testing" } });
    fireEvent.change(bookAuthor, { target: { value: "testing" } });

    const resetButton = screen.getByTestId("bookform-reset");
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);

    expect(bookTitle.value).toMatch("");
    expect(bookAuthor.value).toMatch("");
  });
});

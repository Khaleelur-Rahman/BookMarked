import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import { BrowserRouter as Router } from "react-router-dom";

describe("Footer", () => {
  test("renders the component", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const githubLink = screen.getByTestId("github-link");
    const linkedinLink = screen.getByTestId("linkedin-link");

    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
  });
});

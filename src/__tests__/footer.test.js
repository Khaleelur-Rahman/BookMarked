import React from 'react';
import { render, screen} from '@testing-library/react';
import Footer from '../components/Footer';
import '@testing-library/jest-dom'

describe("footer", () => {
    test("Contains github and linkedin Links", () => {
        render(<Footer />);
        const github = screen.getByTestId("github-link");
        const linkedin = screen.getByTestId("linkedin-link");

        expect(github).toBeInTheDocument();
        expect(linkedin).toBeInTheDocument();

    })

    test("Comtains author name", () => {
        render(<Footer />);
        expect(screen.getByText(/Khaleelur rahman/i)).toBeInTheDocument();
    })
})
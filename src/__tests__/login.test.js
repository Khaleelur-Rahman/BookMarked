import { render, screen, cleanup } from '@testing-library/react'
import login from '../Pages/login'

afterEach (() => {
    cleanup();
})

test ('test render of login page', () => {
    render(< login />);
})
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { act } from 'react';
import Home from '../pages/Home/Home';
import '@testing-library/jest-dom';
import axios from "axios";


jest.mock('@formkit/auto-animate/react', () => ({
    useAutoAnimate: () => [null],
}));
jest.mock('axios');

describe('Home', () => {
    const mockItems = [
        { id: 10, name: "Obi-Wan Kenobi" },
        { id: 12, name: "Wilhuff Tarkin" },
    ];

    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: {
                count: 20,
                results: mockItems,
            }
        });
    });

    test('renders Home component', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            );
        })

        expect(await screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
    });

    test('renders CardList with items', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            );
        });

        expect(await screen.findByText(/Obi-Wan Kenobi/i)).toBeInTheDocument();
        expect(await screen.findByText(/Wilhuff Tarkin/i)).toBeInTheDocument();
    });
});

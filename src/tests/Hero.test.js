import axios from 'axios';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Hero from '../pages/Hero/Hero';
import '@testing-library/jest-dom';

global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

jest.mock('axios');

const mockItems = { results: [{ id: 10, name: "Obi-Wan Kenobi" }] };
const mockFilms = { results: [{ id: "film1", title: "Obi-Wan Kenobi: A New Hope" }] };
const mockShips = { results: [{ id: "ship1", name: "X-wing", films: ["film1"] }] };

describe('Hero', () => {
    beforeEach(() => {
        axios.get.mockImplementation((url) => {
            if (url.includes('/people/')) {
                return Promise.resolve({ data: mockItems });
            } else if (url.includes('/films/')) {
                return Promise.resolve({ data: mockFilms });
            } else if (url.includes('/starships/')) {
                return Promise.resolve({ data: mockShips });
            }
        });
    });

    test("Receives data from location.state and displays the hero's name in a graphical node", async () => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[{ pathname: '/hero/10', state: { item: mockItems.results[0] } }] }>
                    <Routes>
                        <Route path='/hero/:id' element={<Hero />} />
                    </Routes>
                </MemoryRouter>
            );
        });
            const heroNode = await screen.findByText(mockItems.results[0].name);
            expect(heroNode).toBeInTheDocument();

    });

    test('Component calls getFilms and getStarShips on load', async () => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[{ pathname: '/hero/10', state: { item: mockItems.results[0] } }]}>
                    <Routes>
                        <Route path='/hero/:id' element={<Hero />} />
                    </Routes>
                </MemoryRouter>
            );
        });
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/films/'));
            expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/starships/'));
        });

    });
    test('displays nodes for the hero, movies and ships after loading data', async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/hero/1', state: { item: mockItems.results[0] } }]}>
                <Routes>
                    <Route path="/hero/:id" element={<Hero />} />
                </Routes>
            </MemoryRouter>
        );

        const heroNode = await screen.findByText(mockItems.results[0].name);
        expect(heroNode).toBeInTheDocument();

        const filmNode = await screen.findByText(mockFilms.results[0].title);
        const starshipNode = await screen.findByText(mockShips.results[0].name);

        expect(filmNode).toBeInTheDocument();
        expect(starshipNode).toBeInTheDocument();
    });
});

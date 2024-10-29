import { render, screen } from '@testing-library/react';
import CardList from "../components/CardList/CardList";
import {MemoryRouter} from "react-router-dom";
import '@testing-library/jest-dom';

jest.mock('@formkit/auto-animate/react', () => ({
    useAutoAnimate: () => [null],
}));

const mockItems = [
    { id: 10, name: "Obi-Wan Kenobi" },
    { id: 12, name: "Wilhuff Tarkin" },
];

describe('CardList Component', () => {
    test('renders link with correct href attributes', () => {
        render(
            <MemoryRouter>
                <CardList items={mockItems} />
            </MemoryRouter>

        );
        mockItems.forEach(mockItem => {
            const linkElement = screen.getByText(mockItem.name).closest('a');
            expect(linkElement).toHaveAttribute('href', `/hero/${mockItem.id}`);
        })
    })
})
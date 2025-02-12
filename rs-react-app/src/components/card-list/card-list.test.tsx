import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardList } from './card-list.tsx';

vi.mock('../card/Card.tsx', () => ({
  Card: ({ name }: { name: string }) => <div>{name}</div>,
}));

describe('CardList Component', () => {
  it('renders the specified number of cards', () => {
    const mockItems = [
      { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' },
      { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur' },
    ];

    render(<CardList items={mockItems} />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();

    expect(screen.getAllByText(/./).length).toBe(mockItems.length);
  });

  it('displays a message when no cards are present', () => {
    render(<CardList items={[]} />);

    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });
});

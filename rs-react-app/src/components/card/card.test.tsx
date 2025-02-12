import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Card } from './Card';
import { MemoryRouter, useSearchParams } from 'react-router';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

const mockSetSearchParams = vi.fn();
(useSearchParams as jest.Mock).mockReturnValue([
  new URLSearchParams(),
  mockSetSearchParams,
]);

describe('Card Component', () => {
  const mockPokemon = {
    name: 'Pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
  };

  const mockPokeInfo = {
    sprites: { front_default: 'https://pokeapi.co/pikachu-sprite.png' },
    name: 'Pikachu',
  };

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPokeInfo),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the card with the correct name', async () => {
    render(
      <MemoryRouter>
        <Card name={mockPokemon.name} url={mockPokemon.url} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByAltText(mockPokeInfo.name)).toBeInTheDocument()
    );
  });

  it('displays loading state while fetching data', async () => {
    render(
      <MemoryRouter>
        <Card name={mockPokemon.name} url={mockPokemon.url} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading\.\.\.\./i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByAltText(mockPokeInfo.name)).toBeInTheDocument()
    );
  });

  it('updates the URL query parameters when the card is clicked', async () => {
    render(
      <MemoryRouter>
        <Card name={mockPokemon.name} url={mockPokemon.url} />
      </MemoryRouter>
    );

    const card = screen.getByText(mockPokemon.name);
    fireEvent.click(card);

    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
  });

  it('handles fetch errors gracefully', async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Fetch error'))
    ) as jest.Mock;

    render(
      <MemoryRouter>
        <Card name={mockPokemon.name} url={mockPokemon.url} />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.queryByAltText(mockPokeInfo.name)).not.toBeInTheDocument()
    );
  });
});

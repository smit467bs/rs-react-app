import { Poke } from '../../interfaces';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const DetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pokemonName = searchParams.get('details');

  const [pokemon, setPokemon] = useState<Poke | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchData = async (name: string) => {

    const url = `${API_URL}/${name}`;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        setError('Извините, произошла ошибка, попробуйте обновить старницу!');
        setIsLoading(false);
      }

      const data = await response.json();
      setPokemon(data);
      setIsLoading(false);
    } catch (error) {
      setError(String(error));
      setIsLoading(false);
    }

  };


  useEffect(() => {
    if (!pokemonName) return;
    fetchData(pokemonName);
  }, [pokemonName]);

  const closeDetails = () => {
    setSearchParams((params) => {
      params.delete('details');
      return params;
    });
  };

  if (pokemonName === null) return null;

  return (
    <div
      className="w-1/3 bg-white p-4 shadow-lg absolute right-0 top-0 h-full"
    >
      {isLoading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="tex-red-500">{error}</p>}

      {pokemon && (
        <div className="items-center
        text-gray-700 text-sm">
          <h2 className="text-xl font-semibold text-gray-800">{pokemon.name}</h2>
          <img
            className="w-32 h-32 mx-auto mb-2 border border-gray-300 rounded-lg"
            src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p><span className="font-medium"> Weight: </span>{pokemon.weight}</p>
          <p><span className="font-medium"> Height: </span> {pokemon.height}</p>

          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={closeDetails}
          >
            Close
          </button>

        </div>
      )
      }
    </div>


  );
};

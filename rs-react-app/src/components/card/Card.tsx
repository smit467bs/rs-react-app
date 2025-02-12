import { useCallback, useEffect, useState } from 'react';
import { Poke } from '../../interfaces';
import { useSearchParams } from 'react-router';

interface Props {
  name: string;
  url: string;
}

export const Card = ({ name, url }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokeInfo, setPokeInfo] = useState<Poke | null>(null);
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${url}`);
      if (response.ok) {
        const data = await response.json();
        setPokeInfo(data);
      } else {
        console.error(`Could not fetch data from ${url}`);
      }
    } catch (error) {
      console.error(`Could not fetch data from ${url}:`, error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [searchParams, fetchData]);

  const handleCardClick = (name: string) => {
    setSearchParams((params) => {
      params.set('details', name);
      return params;
    });
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-2 border border-gray-200 hover:shadow-xl transition duration-300"
      onClick={() => handleCardClick(name)}
    >
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      {pokeInfo ? (
        <div className="text-gray-700 text-sm">
          {pokeInfo.sprites.front_default ? (
            <img
              className="w-32 h-32 mx-auto mb-2 border border-gray-300 rounded-lg"
              src={pokeInfo.sprites.front_default}
              alt={pokeInfo.name}
            />
          ) : null}
        </div>
      ) : (
        <p className="text-gray-600">Loading.....</p>
      )}
    </div>
  );
};
